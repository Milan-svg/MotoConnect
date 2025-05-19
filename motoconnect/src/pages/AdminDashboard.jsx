import React, { useEffect, useState } from "react";
import {
  approveMechanic,
  deleteMechanic,
  getPendingMechanics,
} from "../services/mechanicServices";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { PendingMechCard } from "../components/PendingMechCard";
import PendingMechSidebar from "../components/PendingMechSidebar";

function AdminDashboard() {
  const [mechanics, setMechanics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMechanic, setSelectedMechanic] = useState(null);

  async function getPendingMech() {
    try {
      const list = await getPendingMechanics();
      setMechanics(list);
    } catch (error) {
      console.log("error while fetching pending Mechanics:", err.message);
      toast.error("Could'nt fetch pending mechanics : (");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPendingMech();
  }, []); // i added delete function in dependancy by mistake, it didnt work as the delete function itself did not change

  async function handleDelete(id) {
    const success = await deleteMechanic(id);
    if (success) {
      toast.success("mechanic deleted");
      //refetch
      setSelectedMechanic(null);
      getPendingMech();
    } else {
      toast.error("couldnt delete the mechanic");
    }
  }

  async function handleApprove(mechanic) {
    const success = await approveMechanic(mechanic);
    if (success) {
      toast.success("Mechanic Approved!");
      setSelectedMechanic(null);
      getPendingMech();
    } else {
      toast.error("Could'nt Approve :(");
    }
  }
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-3xl font-bold">Loading Mechanics...</p>
      </div>
    );
  return (
    <div className="min-h-screen w-full p-6">
      <h1 className="flex items-center justify-center mb-5 text-3xl">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mechanics.length > 0 ? (
          mechanics.map((mechanic) => (
            <PendingMechCard
              key={mechanic.id}
              mechanic={mechanic}
              onView={() => setSelectedMechanic(mechanic)}
            />
          ))
        ) : (
          <div className="flex col-span-full justify-center items-center h-[600px] text-lg">
            Nothing to approve here yet
          </div>
        )}
      </div>
      {/* show sidebar here if mechanic is selected, isOpen ke basis pe */}
      <PendingMechSidebar
        mechanic={selectedMechanic}
        onClose={() => setSelectedMechanic(null)}
        onApprove={handleApprove}
        onDelete={handleDelete}
        isOpen={!!selectedMechanic}
      />
    </div>
  );
}

export default AdminDashboard;
