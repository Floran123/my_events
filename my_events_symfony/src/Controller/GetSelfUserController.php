<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class GetSelfUserController extends AbstractController
{

    public function __construct(TokenStorageInterface $tokenStorage, ContainerBagInterface $params)
    {
        $this->tokenStorage = $tokenStorage;
        $this->encoders = [new XmlEncoder(), new JsonEncoder()];
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
        ];
        $this->normalizers = [new DateTimeNormalizer(), new ObjectNormalizer(null, null, null, null, null, null, $defaultContext)];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
        $this->params = $params;
    }


    /**
     * @Route("/api/get/me", name="get_me", methods={"GET"})
     */

    public function getMyself(): Response
    {
        $token = $this->tokenStorage->getToken();
        if (!$token) {
            return null;
        }

        $user = $token->getUser();

        if (!$user instanceof User) {
            return null;
        }
        $json = $this->serializer->serialize($user, 'json', [AbstractNormalizer::IGNORED_ATTRIBUTES => ["password", "salt"]]);
        return new JsonResponse(json_decode($json), Response::HTTP_ACCEPTED);
    }
}
