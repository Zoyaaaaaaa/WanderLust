'use client'
import { useState } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook for redirection

interface Activity {
  id: string;
  name: string;
  category: 'Food' | 'Culture' | 'Adventure';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  time_estimate: string;
  description: string;
  location: string;
  completed?: boolean;
}

interface Challenge {
  title: string;
  activities: Activity[];
}

const GenerateActivityPage: React.FC = () => {
  const [cityInput, setCityInput] = useState('');
  const [localityInput, setLocalityInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedChallenge, setGeneratedChallenge] = useState<Challenge | null>(null);
  const router = useRouter(); // Initialize useRouter for redirection

  const generateChallenge = async () => {
    if (!cityInput.trim()) {
      setErrorMessage('City is required. Please enter a city name.');
      return;
    }

    setGenerating(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const location = localityInput.trim()
        ? `${cityInput.trim()}, ${localityInput.trim()}`
        : cityInput.trim();

      // Simulate an API call to generate activities (replace with actual API logic)
      const response = await fetch('/api/generate-activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: cityInput.trim(),
          locality: localityInput.trim(),
        }),
      });

      if (!response.ok) throw new Error('Failed to generate activities');

      const data = await response.json();
      if (data.activities) {
        setSuccessMessage(`New challenge created! Explore ${location}!`);
        setGeneratedChallenge(data); // Store the generated challenge
        // After success, redirect to /activities page
        router.push('/activities');
      }
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'Error generating challenge');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate New Activity Challenge</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">City</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Enter a city"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Locality (Optional)</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={localityInput}
          onChange={(e) => setLocalityInput(e.target.value)}
          placeholder="Enter a locality"
        />
      </div>
      <button
        onClick={generateChallenge}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={generating}
      >
        {generating ? 'Generating...' : 'Generate Challenge'}
      </button>
      {errorMessage && (
        <p className="mt-4 text-red-600">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="mt-4 text-green-600">{successMessage}</p>
      )}
      {generatedChallenge && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-bold">{generatedChallenge.title}</h2>
          <ul className="mt-2 list-disc list-inside">
            {generatedChallenge.activities.map((activity) => (
              <li key={activity.id}>
                <strong>{activity.name}</strong> ({activity.category} - {activity.difficulty}):
                {activity.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GenerateActivityPage;
