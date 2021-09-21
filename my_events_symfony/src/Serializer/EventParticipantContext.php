<?php

namespace App\Serializer;

use ApiPlatform\Core\Serializer\SerializerContextBuilderInterface;
use Symfony\Component\HttpFoundation\Request;

final class EventParticipantContext implements SerializerContextBuilderInterface
{
    private $decorated;

    public function __construct(SerializerContextBuilderInterface $decorated)
    {
        $this->decorated = $decorated;
    }

    public function createFromRequest(Request $request, bool $normalization, ?array $extractedAttributes = null): array
    {
        $context = $this->decorated->createFromRequest($request, $normalization, $extractedAttributes);

        if ($request->getMethod() === Request::METHOD_PATCH) {
            if ($normalization) {
                $context['groups'][] = 'put:read';
            } else {
                $context['groups'][] = 'put:write';
            }
        }

        return $context;
    }
}