<?php

namespace App\Service;

use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class ChatbotService
{
    private $rawgApiKey;
    private $chatGPTApiUrl;
    private $chatGPTApiKey;
    private $httpClient;

    public function __construct(ParameterBagInterface $parameterBag)
    {
        $this->httpClient = HttpClient::create();
        $this->rawgApiKey = $parameterBag->get('rawgApiKey');
        $this->chatGPTApiUrl = $parameterBag->get('chatGPTApiUrl');
        $this->chatGPTApiKey = $parameterBag->get('chatGPTApiKey');
    }

    public function getChatbotResponse(string $userMessage): string
    {
        // Appel à OpenAI
        $openAiResponse = $this->getOpenAiResponse($userMessage);

        // Ajouter des recommandations de jeux si nécessaire
        if (str_contains(strtolower($userMessage), 'jeux') || str_contains(strtolower($userMessage), 'recommande')) {
            $games = $this->getRecommendedGames();
            $gamesList = implode("\n", array_map(fn($game) => "- " . $game['name'], $games));
            $openAiResponse .= "\nVoici quelques recommandations :\n" . $gamesList;
        }

        return $openAiResponse;
    }

    private function getOpenAiResponse(string $message): string
    {
        usleep(500000); // Pause pour limiter les requêtes

        try {
            $response = $this->httpClient->request('POST', $this->chatGPTApiUrl, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->chatGPTApiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'model' => 'gpt-3.5-turbo',
                    'messages' => [
                        ['role' => 'user', 'content' => $message],
                    ],
                    'max_tokens' => 150,
                    'temperature' => 0.7,
                ],
            ]);

            $data = $response->toArray();
            return $data['choices'][0]['message']['content'] ?? "Je n'ai pas pu obtenir de réponse.";
        } catch (\Exception $e) {
            if ($e->getCode() === 429) {
                return "Trop de requêtes envoyées. Merci d'attendre un moment avant de réessayer.";
            }
            return "Une erreur est survenue : " . $e->getMessage();
        }
    }

    private function getRecommendedGames(): array
    {
        try {
            $response = $this->httpClient->request('GET', "https://api.rawg.io/api/games?key={$this->rawgApiKey}&ordering=-rating&page_size=5");
            $data = $response->toArray();
            return $data['results'] ?? [];
        } catch (\Exception $e) {
            return []; // Retourne une liste vide en cas d'erreur
        }
    }
}
