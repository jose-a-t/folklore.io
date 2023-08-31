import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';  // Important: This imports the default styles
import L from 'leaflet';  // Import the leaflet library 
import { Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';  // Import the icon

// Get the SVG string of the LocationOn icon and convert it to data URI format
const svgIcon = <LocationOnIcon style={{ fontSize: 40, color: 'red' }} />; 
console.log(svgIcon);

const svgPath = `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>`;

const svgUrl = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
    ${svgPath}
  </svg>
`);
 


// Define the custom icon
const customIcon = new L.Icon({
  iconUrl: `data:image/svg+xml,${svgUrl}`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

function LeafletMap({ stories, onMarkerClick }) {
    return (
        <MapContainer center={[21.8518, -102.2877]} zoom={6} style={{ width: '100%', height: '100vh' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {stories.map(story => (
                <Marker 
                  key={story.country} 
                  position={[parseFloat(story.latitude), parseFloat(story.longitude)]}
                  icon={customIcon}
                >
                    <Popup>
                        <div 
                          onClick={() => onMarkerClick(story)}
                          style={{ cursor: 'pointer' }}  // Changes the cursor to indicate clickability
                        >
                            <Typography variant="h8">{story.name}</Typography>
                            <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 4,  
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    width: '100%'
                                }}
                            >
                                {story.story}
                            </Typography>
                        </div>
                    </Popup>
                </Marker>
            ))}
            
            {/* Test Marker */}
            
        </MapContainer>
    );
}

export default LeafletMap;
