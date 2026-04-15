// API client for sponsors management
import { getApiBaseUrl } from './apiBaseUrl';

const API_BASE_URL = getApiBaseUrl();

export interface Sponsor {
  id: string;
  name: string;
  path: string;
  type: "image" | "pdf" | "svg";
  tier: "gold" | "silver" | "k12" | "university" | "media";
}

// Fetch all sponsors data
export async function fetchSponsorsData(): Promise<Sponsor[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/sponsors`);
    if (!response.ok) throw new Error('Failed to fetch sponsors data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching sponsors data:', error);
    // Fallback to empty array if API fails
    return [];
  }
}

// Save entire sponsors data
export async function saveSponsorsData(data: Sponsor[]): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/sponsors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sponsors: data }),
    });
    if (!response.ok) throw new Error('Failed to save sponsors data');
  } catch (error) {
    console.error('Error saving sponsors data:', error);
    throw error;
  }
}

// Update a specific sponsor
export async function updateSponsor(sponsorId: string, sponsorData: Partial<Sponsor>): Promise<Sponsor> {
  try {
    const response = await fetch(`${API_BASE_URL}/sponsors/${sponsorId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sponsorData),
    });
    if (!response.ok) throw new Error('Failed to update sponsor');
    const result = await response.json();
    return result.sponsor;
  } catch (error) {
    console.error('Error updating sponsor:', error);
    throw error;
  }
}

// Delete a sponsor
export async function deleteSponsor(sponsorId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/sponsors/${sponsorId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete sponsor');
  } catch (error) {
    console.error('Error deleting sponsor:', error);
    throw error;
  }
}

// Upload a sponsor logo file
export async function uploadSponsorLogo(
  file: File
): Promise<{ url: string; filename: string }> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/sponsors/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload image');
    }

    const result = await response.json();
    return { url: result.url, filename: result.filename };
  } catch (error) {
    console.error('Error uploading sponsor logo:', error);
    throw error;
  }
}

// Delete a sponsor logo file
export async function deleteSponsorLogo(imagePath: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/sponsors/image`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imagePath }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete image');
    }
  } catch (error) {
    console.error('Error deleting sponsor logo:', error);
    throw error;
  }
}
