'use client'

import { useEffect, useState } from 'react'
import type { DivIcon } from 'leaflet'

const OFFICE = { lat: 52.2856, lng: -1.5337 } // 5 North Hall, Spencer Yard, CV31 3SY
const TRAIN_STATION = { lat: 52.2816, lng: -1.5365 } // Leamington Spa station
const CAR_PARK = { lat: 52.2870, lng: -1.5380 } // Covent Garden car park

interface MarkerData {
  position: [number, number]
  label: string
  type: 'office' | 'station' | 'parking'
}

const MARKERS: MarkerData[] = [
  { position: [OFFICE.lat, OFFICE.lng], label: 'Playbook Advisory Group — 5 North Hall, Spencer Yard', type: 'office' },
  { position: [TRAIN_STATION.lat, TRAIN_STATION.lng], label: 'Leamington Spa Railway Station — 5 min walk', type: 'station' },
  { position: [CAR_PARK.lat, CAR_PARK.lng], label: 'Covent Garden Car Park — 2 min walk', type: 'parking' },
]

function createIcon(L: typeof import('leaflet'), type: MarkerData['type']): DivIcon {
  const colours: Record<MarkerData['type'], string> = {
    office: '#af7e56',   // gold
    station: '#264852',  // teal
    parking: '#264852',  // teal
  }

  const labels: Record<MarkerData['type'], string> = {
    office: 'P',
    station: '🚂',
    parking: '🅿',
  }

  const colour = colours[type]
  const label = labels[type]
  const size = type === 'office' ? 36 : 28

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size * 1.3}" viewBox="0 0 ${size} ${size * 1.3}">
      <path d="M${size / 2} ${size * 1.3} C${size / 2} ${size * 1.3} ${size} ${size * 0.65} ${size} ${size * 0.45}
        C${size} ${size * 0.2} ${size * 0.78} 0 ${size / 2} 0
        C${size * 0.22} 0 0 ${size * 0.2} 0 ${size * 0.45}
        C0 ${size * 0.65} ${size / 2} ${size * 1.3} ${size / 2} ${size * 1.3}Z"
        fill="${colour}" stroke="#fff" stroke-width="1.5"/>
      <text x="${size / 2}" y="${size * 0.48}" text-anchor="middle" dominant-baseline="central"
        font-size="${type === 'office' ? 14 : 12}" fill="#fff" font-family="Inter, sans-serif" font-weight="600">
        ${label}
      </text>
    </svg>`

  return L.divIcon({
    html: svg,
    className: 'contact-map-marker',
    iconSize: [size, size * 1.3],
    iconAnchor: [size / 2, size * 1.3],
    popupAnchor: [0, -(size * 1.1)],
  })
}

export default function ContactMap() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className="w-full rounded-sm bg-sand"
        style={{ aspectRatio: '16/10', minHeight: '300px' }}
        aria-label="Map loading"
      />
    )
  }

  return <MapInner />
}

function MapInner() {
  /* Dynamic import to avoid SSR issues with Leaflet */
  const [components, setComponents] = useState<{
    MapContainer: typeof import('react-leaflet').MapContainer
    TileLayer: typeof import('react-leaflet').TileLayer
    Marker: typeof import('react-leaflet').Marker
    Popup: typeof import('react-leaflet').Popup
    L: typeof import('leaflet')
  } | null>(null)

  useEffect(() => {
    async function load() {
      const [rl, L] = await Promise.all([
        import('react-leaflet'),
        import('leaflet'),
      ])
      /* Import Leaflet CSS */
      // @ts-expect-error -- CSS module import handled by bundler at runtime
      await import('leaflet/dist/leaflet.css')
      setComponents({
        MapContainer: rl.MapContainer,
        TileLayer: rl.TileLayer,
        Marker: rl.Marker,
        Popup: rl.Popup,
        L: L.default || L,
      })
    }
    load()
  }, [])

  if (!components) {
    return (
      <div
        className="w-full rounded-sm bg-sand"
        style={{ aspectRatio: '16/10', minHeight: '300px' }}
        aria-label="Map loading"
      />
    )
  }

  const { MapContainer, TileLayer, Marker, Popup, L } = components

  return (
    <MapContainer
      center={[OFFICE.lat, OFFICE.lng]}
      zoom={15}
      scrollWheelZoom={false}
      className="w-full rounded-sm"
      style={{ aspectRatio: '16/10', minHeight: '300px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {MARKERS.map((m) => (
        <Marker
          key={m.type}
          position={m.position}
          icon={createIcon(L, m.type)}
        >
          <Popup>
            <span className="text-sm font-medium">{m.label}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
