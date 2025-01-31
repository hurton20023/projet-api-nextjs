"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Textarea,
  Label,
  Input,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/";
import Image from "next/image";

type Ad = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const page = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adToDelete, setAdToDelete] = useState<number | null>(null);
  const [newAd, setNewAd] = useState<Omit<Ad, "id">>({
    title: "",
    description: "",
    image: "",
  });
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdDetailsModalOpen, setIsAdDetailsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("/api/ads", { cache: "force-cache" });
        if (!response.ok) {
          throw new Error("Failed to fetch ads");
        }
        const res = await response.json();
        setAds(res.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAds();
  }, []);

  const handleAddAd = async () => {
    setIsCreating(true);
    try {
      const formData = new FormData();
      formData.append("title", newAd.title);
      formData.append("description", newAd.description);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch("/api/ads", {
        method: "POST",
        body: formData,
        cache: "force-cache",
      });

      if (!response.ok) {
        throw new Error("Failed to create ad");
      }

      const result = await response.json();
      setAds([...ads, result.data]);

      setNewAd({ title: "", description: "", image: "" });
      setImageFile(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating ad:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateAd = async () => {
    if (!editingAd) return;
    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append("title", editingAd.title);
      formData.append("description", editingAd.description);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(`/api/ads/${editingAd?.id}`, {
        method: "PUT",
        body: formData,
        cache: "force-cache",
      });

      if (!response.ok) {
        throw new Error("Failed to update ad");
      }

      const result = await response.json();
      setAds(ads.map((ad) => (ad.id === editingAd.id ? result.data : ad)));

      setEditingAd(null);
      setImageFile(null);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating ad:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAd = async () => {
    if (!adToDelete) return;
    try {
      const response = await fetch(`/api/ads/${adToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete ad");
      }

      setAds(ads.filter((ad) => ad.id !== adToDelete));
      setIsDeleteModalOpen(false);
      setAdToDelete(null);
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Annonces</h1>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Ajouter une annonce</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle annonce</DialogTitle>
            <DialogDescription>
              Remplissez les détails de votre nouvelle annonce ici.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Titre
              </Label>
              <Input
                id="title"
                value={newAd.title}
                onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newAd.description}
                onChange={(e) =>
                  setNewAd({ ...newAd, description: e.target.value })
                }
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    if (file.type === "image/png" || file.type === "image/jpeg") {
                      setImageFile(file);
                    } else {
                      alert("Veuillez sélectionner un fichier PNG ou JPEG.");
                      e.target.value = ""; // Clear the input
                    }
                  }
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddAd} disabled={isCreating}>
              {isCreating ? "Création en cours..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'annonce</DialogTitle>
            <DialogDescription>
              Modifiez les détails de l'annonce ici.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Titre
              </Label>
              <Input
                id="title"
                value={editingAd?.title || ""}
                onChange={(e) =>
                  setEditingAd({ ...editingAd!, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={editingAd?.description || ""}
                onChange={(e) =>
                  setEditingAd({ ...editingAd!, description: e.target.value })
                }
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    if (file.type === "image/png" || file.type === "image/jpeg") {
                      setImageFile(file);
                    } else {
                      alert("Veuillez sélectionner un fichier PNG ou JPEG.");
                      e.target.value = ""; // Clear the input
                    }
                  }
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateAd} disabled={isUpdating}>
              {isUpdating ? "Mise à jour en cours..." : "Mettre à jour"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Voulez-vous vraiment supprimer
              cette annonce ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAd}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={isAdDetailsModalOpen}
        onOpenChange={setIsAdDetailsModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedAd?.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ad-image" className="text-right">
                Image
              </Label>
              <Image
                src={selectedAd?.image || ""}
                alt={selectedAd?.title || ""}
                width={200}
                height={100}
                className="w-full h-40 object-cover mb-2 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ad-description" className="text-right">
                Description
              </Label>
              <CardDescription>{selectedAd?.description}</CardDescription>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAdDetailsModalOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p>Chargement des annonces...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ads && ads.length > 0 ? (
            ads.map((ad) => (
              <div
                key={ad.id}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedAd(ad);
                  setIsAdDetailsModalOpen(true);
                }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{ad.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={ad.image}
                      alt={ad.title}
                      width={200}
                      height={100}
                      className="w-full h-40 object-cover mb-2 rounded-lg"
                    />
                    <CardDescription>{ad.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingAd(ad);
                        setIsEditModalOpen(true);
                      }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAdToDelete(ad.id);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      Supprimer
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Il n'y a rien à afficher pour le moment.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default page;