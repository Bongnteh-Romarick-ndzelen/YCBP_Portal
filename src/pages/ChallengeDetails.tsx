// src/pages/ChallengeDetail.tsx
import React, { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { usePortal } from "../contexts/PortalContext";
import type { Challenge } from "../utils/constants";

// Mock function to find a challenge by ID
const findChallengeById = (
  challenges: Challenge[],
  id: string
): Challenge | undefined => challenges.find((c) => c.id === id);

export const ChallengeDetail: React.FC<{ challengeId: string }> = ({
  challengeId,
}) => {
  const { theme, navigate } = useAuth();
  const { challenges, handleChallengeSolve } = usePortal();

  // State for user input (the "flag") and submission status
  const [submission, setSubmission] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Find the current challenge
  const challenge = findChallengeById(challenges, challengeId);

  if (!challenge) {
    return <div className="p-8 text-red-500">Challenge not found.</div>;
  }

  const cardBgClass =
    theme === "dark" ? "bg-slate-800 shadow-xl" : "bg-white shadow-lg";
  const textClass = theme === "dark" ? "text-slate-300" : "text-slate-700";

  // --- Submission Logic ---
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setStatusMessage("");

      // Use the secure, backend-only flag for validation (or mock it here)
      const expectedFlag =
        challenge.solution_flag || `FLAG{${challenge.id}_SECRET}`;

      if (challenge.status === "Complete") {
        setStatusMessage("Already completed!");
        return;
      }

      if (submission.trim() === expectedFlag) {
        handleChallengeSolve(challenge.id, challenge.points);

        setStatusMessage(`Success! You earned ${challenge.points} points.`);
        setTimeout(() => {
          navigate("challenges"); // Go back to the challenges list
        }, 2000);
      } else {
        setStatusMessage("Incorrect flag. Try again.");
      }
    },
    [submission, challenge, handleChallengeSolve, navigate]
  );

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("challenges")}
        className="mb-4 text-cyan-500 hover:text-cyan-400 flex items-center"
      >
        <span className="mr-1">&larr;</span> Back to Challenges
      </button>

      <div className={`p-8 rounded-xl ${cardBgClass}`}>
        <h2 className="text-4xl font-extrabold mb-2 text-cyan-500">
          {challenge.title}
        </h2>
        <span
          className={`text-sm font-medium ${
            challenge.status === "Complete"
              ? "text-green-500"
              : "text-yellow-500"
          }`}
        >
          Status: {challenge.status} | {challenge.points} Points
        </span>

        <hr
          className={`my-4 ${
            theme === "dark" ? "border-slate-700" : "border-gray-200"
          }`}
        />

        <div className="prose max-w-none">
          <p className={`text-lg mb-4 ${textClass}`}>{challenge.description}</p>

          {/* // --- REMOVED INSTRUCTIONS BLOCK DUE TO SYNTAX ERROR ---
                        <div className={`p-4 rounded-lg my-6 ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
                            <h4 className="font-bold mb-2 text-md">Instructions:</h4>
                            <p className="text-sm">Find the flag hidden in the application or server. The flag format is 'FLAG{...}'.</p>
                        </div> 
                    */}
        </div>

        {/* --- Submission Form --- */}
        <form onSubmit={handleSubmit} className="mt-8">
          <label
            htmlFor="flag-input"
            className={`block font-semibold mb-2 ${textClass}`}
          >
            Submit Flag:
          </label>
          <input
            id="flag-input"
            type="text"
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            placeholder="Enter the flag you found (e.g., FLAG{...})"
            className={`w-full p-3 border rounded-lg focus:ring-cyan-500 focus:border-cyan-500 ${
              theme === "dark"
                ? "bg-slate-900 border-slate-700 text-white"
                : "bg-white border-gray-300 text-slate-900"
            }`}
            disabled={challenge.status === "Complete"}
          />

          <button
            type="submit"
            className={`mt-4 w-full py-3 rounded-lg font-bold transition duration-200 ${
              challenge.status === "Complete"
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            disabled={challenge.status === "Complete"}
          >
            {challenge.status === "Complete"
              ? "Challenge Complete"
              : "Submit Solution"}
          </button>

          {statusMessage && (
            <p
              className={`mt-3 text-center ${
                statusMessage.includes("Success")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
