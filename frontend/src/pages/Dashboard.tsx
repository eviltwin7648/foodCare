import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Loader2, Plus, Package, MapPin, Calendar, User, AlertCircle, Edit2, Save, X } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { dashboardActions, foodListingActions } from "../lib/actions";

type FoodListing = {
  id: string;
  title: string;
  description: string;
  quantity: number;
  pickupAddress: string;
  expirationDate: string;
  status: string;
  donarId: string;
  donarName: string;
  donarContact: string;
};

type Profile = {
  id: string;
  name: string;
  email: string;
  number: string;
  address: string;
  city: string;
  pincode: string;
  type: string;
};

type Stats = {
  totalDonations?: number;
  activeDonations?: number;
  claimedDonations?: number;
  totalClaims?: number;
  pendingClaims?: number;
  completedClaims?: number;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [myListings, setMyListings] = useState<FoodListing[]>([]);
  const [claimedListings, setClaimedListings] = useState<FoodListing[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<Profile>>({});
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch profile
        const profileData = await dashboardActions.getProfile();
        setProfile(profileData);

        // Fetch statistics
        const statsData = await dashboardActions.getStats();
        setStats(statsData);

        // Fetch user's listings if they're a donor
        if (role === "Donor") {
          const myListingsData = await dashboardActions.getDonations();
          setMyListings(myListingsData);
        }

        // Fetch claimed listings if they're a receiver
        if (role === "Receiver") {
          const claimedData = await dashboardActions.getClaims();
          setClaimedListings(claimedData);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load dashboard data");
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [role, userId, toast]);

  const handleClaim = async (listingId: string) => {
    try {
      if (role !== "Receiver") {
        toast({
          title: "Access Denied",
          description: "Only receivers can claim food items.",
          variant: "destructive",
        });
        return;
      }

      await foodListingActions.claimListing(listingId);
      toast({
        title: "Success!",
        description: "Food claimed successfully.",
      });
      
      // Refresh the claimed listings
      const claimedData = await dashboardActions.getClaims();
      setClaimedListings(claimedData);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to claim food. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const updatedProfile = await dashboardActions.updateProfile(editedProfile);
      setProfile(updatedProfile);
      setIsEditingProfile(false);
      toast({
        title: "Success!",
        description: "Profile updated successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE724C]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-xl text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  const renderFoodCard = (listing: FoodListing) => (
    <Card key={listing.id} className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{listing.title}</h3>
        <span className={`px-2 py-1 rounded-full text-sm ${
          listing.status === "AVAILABLE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {listing.status}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{listing.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-[#FE724C]" />
          <span>{listing.quantity} servings</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#FE724C]" />
          <span>{new Date(listing.expirationDate).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-4 w-4 text-[#FE724C]" />
        <span>{listing.pickupAddress}</span>
      </div>
      {(role === "Receiver") && listing.status === "AVAILABLE" && (
        <Button
          onClick={() => handleClaim(listing.id)}
          className="w-full bg-[#FE724C] hover:bg-[#e6623d] text-white"
        >
          Claim Food
        </Button>
      )}
    </Card>
  );

  const renderStats = () => {
    if (!stats) return null;

    if (role === "Donor") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Total Donations</h3>
            <p className="text-3xl font-bold text-[#FE724C]">{stats.totalDonations}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Active Donations</h3>
            <p className="text-3xl font-bold text-green-600">{stats.activeDonations}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Claimed Donations</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.claimedDonations}</p>
          </Card>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Claims</h3>
          <p className="text-3xl font-bold text-[#FE724C]">{stats.totalClaims}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Pending Claims</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingClaims}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Completed Claims</h3>
          <p className="text-3xl font-bold text-green-600">{stats.completedClaims}</p>
        </Card>
      </div>
    );
  };

  const renderProfile = () => {
    if (!profile) return null;

    if (isEditingProfile) {
      return (
        <Card className="p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditingProfile(false)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleProfileUpdate}
                className="bg-[#FE724C] hover:bg-[#e6623d] text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedProfile.name || profile.name}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Phone Number</Label>
              <Input
                id="number"
                value={editedProfile.number || profile.number}
                onChange={(e) => setEditedProfile({ ...editedProfile, number: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={editedProfile.address || profile.address}
                onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={editedProfile.city || profile.city}
                onChange={(e) => setEditedProfile({ ...editedProfile, city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                value={editedProfile.pincode || profile.pincode}
                onChange={(e) => setEditedProfile({ ...editedProfile, pincode: e.target.value })}
              />
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card className="p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Profile</h2>
          <Button
            variant="outline"
            onClick={() => setIsEditingProfile(true)}
            className="text-[#FE724C] hover:text-[#e6623d]"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold">{profile.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-semibold">{profile.number}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-semibold">{profile.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-semibold">{profile.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">City</p>
            <p className="font-semibold">{profile.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pincode</p>
            <p className="font-semibold">{profile.pincode}</p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {role === "Donor" && (
          <Button
            onClick={() => navigate("/createlisting")}
            className="bg-[#FE724C] hover:bg-[#e6623d] text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Listing
          </Button>
        )}
      </div>

      {renderProfile()}
      {renderStats()}

      <Tabs defaultValue={role === "Donor" ? "my-listings" : "claimed"} className="space-y-6">
        <TabsList>
          {role === "Donor" && (
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
          )}
          {role === "Receiver" && (
            <TabsTrigger value="claimed">My Claims</TabsTrigger>
          )}
        </TabsList>

        {role === "Donor" && (
          <TabsContent value="my-listings" className="space-y-4">
            {myListings.map(renderFoodCard)}
          </TabsContent>
        )}

        {role === "Receiver" && (
          <TabsContent value="claimed" className="space-y-4">
            {claimedListings.map(renderFoodCard)}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
} 