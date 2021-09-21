<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Action\NotFoundAction;
use App\Repository\EventRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *  itemOperations={
 *   "delete"={
 *     "access_control"="is_granted('DELETE', previous_object)",
 *     "access_control_message"="You cannot delete."
 *   },
 * "put", "get", "patch"
 *  }
 * )
 * @ORM\Entity(repositoryClass=EventRepository::class)
 */

class Event
{
    /**
     * @Groups({"put:read"})
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"put:read"})
     * @ORM\Column(type="string", length=255)
     */
    private $uid;

    /**
     * @Groups({"put:read"})
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="events", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $organizer;

    /**
     * @Groups({"put:read"})
     * @ORM\Column(type="boolean")
     */
    private $public;

    /**
     * @Groups({"put:write", "put:read"})
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="events_participant")
     */
    private $participant;

    /**
     * @Groups({"put:read"})
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @Groups({"put:read"})
     * @ORM\Column(type="text")
     */
    private $description;

    public function __construct()
    {
        $this->participant = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUid(): ?string
    {
        return $this->uid;
    }

    public function setUid(string $uid): self
    {
        $this->uid = $uid;

        return $this;
    }

    public function getOrganizer(): ?User
    {
        return $this->organizer;
    }

    public function setOrganizer(?User $organizer): self
    {
        $this->organizer = $organizer;

        return $this;
    }

    public function getPublic(): ?bool
    {
        return $this->public;
    }

    public function setPublic(bool $public): self
    {
        $this->public = $public;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getParticipant(): Collection
    {
        return $this->participant;
    }

    public function addParticipant(User $participant): self
    {
        if (!$this->participant->contains($participant)) {
            $this->participant[] = $participant;
        }

        return $this;
    }

    public function removeParticipant(User $participant): self
    {
        $this->participant->removeElement($participant);

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }
}
