<?php

namespace App\Controller;

use App\Repository\EventRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;

class MeetupPublicAPIController extends AbstractController
{

    public function __construct(ContainerBagInterface $params)
    {
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
     * @Route("/api/meetup/public", name="meetup_public_api", methods={"GET"})
     */
    public function index(EventRepository $eventRepository): Response
    {
        $publicEvent = $eventRepository->findBy(["public" => true]);
        $json = $this->serializer->serialize($publicEvent, 'json', [AbstractNormalizer::IGNORED_ATTRIBUTES => ["password", "salt"]]);
        return new JsonResponse(json_decode($json), Response::HTTP_ACCEPTED);
    }
}
