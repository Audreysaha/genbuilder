import React, { useState } from "react";
import imagee from "../assets/images/imagee.png";


const App: React.FC = () => {
const [selectedRole, setSelectedRole] = useState(null);


const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  return (
   <div className="h-screen overflow-hidden bg-gray-900 text-white">
      <div className="container mx-auto px-2 py-4 h-full flex flex-col">
        {/* Header */}
        <header className="flex items-center mb-6">
          <div className="flex items-center">
            <div className="mr-2 text-indigo-500">
              <i className="fas fa-cube text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-300 hover:to-purple-300 transition-all duration-300">GenBuilder</h1>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 mt-8">
          {/* Left Form Section */}
          <div className="w-1/2 pr-12 overflow-auto">
            <p className="text-gray-400 ">
              We'd love to know you better so we can customize your experience.
            </p>

            <h2 className="text-3xl font-bold mb-8">
              What is your primary role?
            </h2>

            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-750 cursor-pointer ${selectedRole === "developer" ? "border-indigo-500" : ""}`}
                onClick={() => handleRoleChange("developer")}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    <div
                      className={`w-5 h-5 rounded-full border ${selectedRole === "developer" ? "border-indigo-500" : "border-gray-500"} flex items-center justify-center`}
                    >
                      {selectedRole === "developer" && (
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      )}
                    </div>
                  </div>
                  <span>Developer</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-750 cursor-pointer ${selectedRole === "founder" ? "border-indigo-500" : ""}`}
                onClick={() => handleRoleChange("founder")}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    <div
                      className={`w-5 h-5 rounded-full border ${selectedRole === "founder" ? "border-indigo-500" : "border-gray-500"} flex items-center justify-center`}
                    >
                      {selectedRole === "founder" && (
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      )}
                    </div>
                  </div>
                  <span>Entrepreneur</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-750 cursor-pointer ${selectedRole === "agency" ? "border-indigo-500" : ""}`}
                onClick={() => handleRoleChange("agency")}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    <div
                      className={`w-5 h-5 rounded-full border ${selectedRole === "agency" ? "border-indigo-500" : "border-gray-500"} flex items-center justify-center`}
                    >
                      {selectedRole === "agency" && (
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      )}
                    </div>
                  </div>
                  <span>Agency Owner</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-750 cursor-pointer ${selectedRole === "designer" ? "border-indigo-500" : ""}`}
                onClick={() => handleRoleChange("designer")}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    <div
                      className={`w-5 h-5 rounded-full border ${selectedRole === "designer" ? "border-indigo-500" : "border-gray-500"} flex items-center justify-center`}
                    >
                      {selectedRole === "designer" && (
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      )}
                    </div>
                  </div>
                  <span>Designer</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-750 cursor-pointer ${selectedRole === "other" ? "border-indigo-500" : ""}`}
                onClick={() => handleRoleChange("other")}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    <div
                      className={`w-5 h-5 rounded-full border ${selectedRole === "other" ? "border-indigo-500" : "border-gray-500"} flex items-center justify-center`}
                    >
                      {selectedRole === "other" && (
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      )}
                    </div>
                  </div>
                  <span>Other</span>
                </div>
              </div>
            </div>

            <button className="mt-10 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer">
              Continue
            </button>
          </div>

          {/* Right Promo Section */}
          <div className="w-1/2 flex items-center justify-center pl-12 border-l border-gray-700">
            <div className="w-1/2 h-full border-l border-gray-700">
           <img src={imagee} alt="Low-code promo" className="w-full h-full object-cover"/>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;





