import React, { useEffect, useState } from "react";
import { getAllMechanics } from "../services/mechanicServices";
import toast from "react-hot-toast";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import { MechanicCard } from "../components/MechanicCard";
function MechanicsList() {
  const [mechanics, setMechanics] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  //on startup well use fetch all mechanics and set them/set errors if any/give toast etc
  useEffect(() => {
    async function fetchMechanics() {
      try {
        const list = await getAllMechanics();
        setMechanics(list);
      } catch (err) {
        console.log("error while fetching mechanicList:", err.message);
        toast.error("Could'nt fetch mechanics : (");
      } finally {
        setisLoading(false);
      }
    }
    fetchMechanics();
  }, []);
  //fuse js setup for improved search and stuff
  // manually mechanics.includes(searchterm.trim()) we could use but itd be too strict, this library allows partial errors/fuzzy search so yeah. we'll wrap this in usememo so that its cached in memory, runs during render and changes when mechanis gets altered.

  const fuse = React.useMemo(() => {
    const options = {
      keys: ["name", "location", "servicesOffered"],
      threshold: 0.3,
    };
    return new Fuse(mechanics, options);
  }, [mechanics]);

  const filteredMechanics = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : mechanics;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-3xl font-bold">Loading Mechanics...</p>
      </div>
    );

  return (
    <div className="p-6 flex flex-col ">
      <h1 className="text-3xl font-bold mb-6 text-center">Find Mechanics</h1>
      <div className="text-black flex flex-col">
        <div className="flex justify-center mb-4">
          <input
            className="shadow-md rounded hover:shadow-lg w-full max-w-md"
            type="text"
            placeholder="search mechanics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMechanics.length > 0 ? (
            filteredMechanics.map((mechanic) => (
              <MechanicCard mechanic={mechanic} key={mechanic.id} />
            ))
          ) : (
            <div className="flex col-span-full items-center justify-center p-8 ">
              <p className="text-xl font-semibold text-white">
                No Mechanics found :/
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MechanicsList;
