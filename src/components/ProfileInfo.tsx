import { useState, useEffect } from "react";
import { Avatar, Tabs } from "antd";
import ImageGrid from "./ImageGrid";
import { useSession } from "next-auth/react";
import Link from "next/link";

const { TabPane } = Tabs;

const ProfileInfo = () => {
  const [activeTab, setActiveTab] = useState("created");
  const { data: session } = useSession();
  const [pinsCreated, setPinsCreated] = useState([]);
  const [pinsSaved, setPinsSaved] = useState([]);

  useEffect(() => {
    const fetchUserPins = async () => {
      if (session?.user.id) {
        try {
          const response = await fetch(
            `/api/getUserPins?userId=${session.user.id}`
          );
          if (response.ok) {
            const data = await response.json();
            setPinsCreated(data.pinsCreated);
            setPinsSaved(data.pinsSaved);
          } else {
            console.error("Failed to fetch user pins");
          }
        } catch (error) {
          console.error("Error fetching user pins:", error);
        }
      }
    };

    fetchUserPins();
  }, [session]);

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-50">
      <div className="flex flex-col items-center">
        <Avatar src={session?.user.profilePicture} className="w-24 h-24" />
        <h1 className="text-2xl font-bold">{session?.user.name}</h1>
      </div>
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        className="w-full mt-8"
        centered
      >
        <TabPane tab="Created" key="created">
          {pinsCreated.length ? (
            <ImageGrid pins={pinsCreated} />
          ) : (
            <div className="flex flex-col items-center gap-5 mt-8">
              <p className="text-gray-600">
                Nothing to show...yet! Pins you create will live here.
              </p>
              <Link href={"/create"}>
                <button className="bg-[var(--primary-color)] text-white">
                  Create Pin
                </button>
              </Link>
            </div>
          )}
        </TabPane>
        <TabPane tab="Saved" key="saved">
          {pinsSaved.length ? (
            <ImageGrid pins={pinsSaved} />
          ) : (
            <div className="flex flex-col items-center mt-8">
              <p className="text-gray-600">
                Nothing to show...yet! Pins you save will live here.
              </p>
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfileInfo;
