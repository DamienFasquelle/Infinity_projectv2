<?php
namespace App\Controller;

use App\Entity\Comment;
use App\Repository\CommentRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Doctrine\ORM\EntityManagerInterface;  // Assure-toi d'importer EntityManagerInterface

class CommentController extends AbstractController
{
    #[Route('/api/comment', name: 'create_comment', methods: ['POST'])]
    public function create(Request $request, UserInterface $user, CommentRepository $commentRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        // Vérification du rôle
        if (!$this->isGranted('ROLE_USER')) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }
        
        // Décodage des données de la requête
        $data = json_decode($request->getContent(), true);

        // Validation des données
        if (empty($data['content']) || !isset($data['rating']) || !isset($data['gameId'])) {
            return $this->json(['error' => 'Invalid data'], 400);
        }

        // Création d'un nouveau commentaire
        $comment = new Comment();
        $comment->setContent($data['content']);
        $comment->setRating($data['rating']);
        $comment->setCreatedAt(new \DateTimeImmutable());
        $comment->setUpdatedAt(new \DateTimeImmutable());
        $comment->setIdGames($data['gameId']);
        $comment->setIdUser($user);

        // Utilisation de l'EntityManager pour persister l'entité
        $entityManager->persist($comment);   // Persiste l'entité
        $entityManager->flush();  // Sauvegarde dans la base de données

        return $this->json(['message' => 'Commentaire créé avec succès'], 201);
    }

    #[Route('/api/comment/{id}', name: 'update_comment', methods: ['PUT'])]
    public function update($id, Request $request, CommentRepository $commentRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupération du commentaire à mettre à jour
        $comment = $commentRepository->find($id);
        if (!$comment) {
            return $this->json(['error' => 'Comment not found'], 404);
        }

        // Vérification que l'utilisateur est bien celui qui a créé le commentaire
        $user = $this->getUser();
        if ($comment->getIdUser() !== $user) {
            throw new AccessDeniedException('Vous ne pouvez pas modifier ce commentaire.');
        }

        // Traitement de la mise à jour
        $data = json_decode($request->getContent(), true);

        if (isset($data['content'])) {
            $comment->setContent($data['content']);
        }
        if (isset($data['rating'])) {
            $comment->setRating($data['rating']);
        }

        $comment->setUpdatedAt(new \DateTimeImmutable());

        // Utilisation de l'EntityManager pour persister l'entité mise à jour
        $entityManager->flush();  // La mise à jour est persistée en base de données

        return $this->json(['message' => 'Commentaire mis à jour avec succès']);
    }

    #[Route('/api/comment/{id}', name: 'delete_comment', methods: ['DELETE'])]
    public function delete($id, CommentRepository $commentRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupération du commentaire à supprimer
        $comment = $commentRepository->find($id);
        if (!$comment) {
            return $this->json(['error' => 'Comment not found'], 404);
        }

        // Vérification que l'utilisateur est bien celui qui a créé le commentaire
        $user = $this->getUser();
        if ($comment->getIdUser() !== $user) {
            throw new AccessDeniedException('Vous ne pouvez pas supprimer ce commentaire.');
        }

        // Suppression du commentaire
        $entityManager->remove($comment);  // On supprime l'entité
        $entityManager->flush();  // Les changements sont appliqués en base de données

        return $this->json(['message' => 'Commentaire supprimé avec succès']);
    }
}
