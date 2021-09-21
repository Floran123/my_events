<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use App\Entity\Event;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class EventsOrganizerExceptionSubscriber implements EventSubscriberInterface
{

    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    public function __construct(TokenStorageInterface $tokenStorage)
    {

        $this->tokenStorage = $tokenStorage;
    }

    public function onKernelView(ViewEvent $event)
    {

        $eventEm = $event->getRequest()->get("data");
        $method = $event->getRequest()->getMethod();

        $token = $this->tokenStorage->getToken();

        if (!$token || !$eventEm instanceof Event) {
            return;
        }

        $owner = $token->getUser();

        if (!$owner instanceof User) {
            return;
        }

        switch ($method) {
            case Request::METHOD_PATCH:
                if ($owner === $eventEm->getOrganizer()) {
                    return;
                }
                $eventEm->addParticipant($owner);
                break;

            case Request::METHOD_POST:
                $eventEm->setOrganizer($owner);
                break;

            case Request::METHOD_PUT:
                $eventEm->removeParticipant($owner);
                break;

            default:
                break;
        }
    }

    public static function getSubscribedEvents()
    {
        return [
            'kernel.view' => ['onKernelView', EventPriorities::PRE_WRITE]
        ];
    }
}
