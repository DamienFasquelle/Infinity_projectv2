<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route('/', name: 'homepage')]
    public function index()
    {
        // Cette méthode va rendre la page index.html.twig dans le dossier templates/default/
        return $this->render('default/index.html.twig');
    }
}

