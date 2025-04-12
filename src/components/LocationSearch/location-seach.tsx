import useLoadGoogleMaps from "@/utils/useLoadGoogleMaps";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import { MapPin } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -15.7942,
  lng: -47.8822,
};

const radiusOptions = [
  { text: "1 km", value: 1000 },
  { text: "5 km", value: 5000 },
  { text: "10 km", value: 10000 },
  { text: "20 km", value: 20000 },
  { text: "30 km", value: 30000 },
  { text: "50 km", value: 50000 },
];

interface LocationSearchProps {
  title?: string;
  setGeoLocation: React.Dispatch<
    React.SetStateAction<
      | {
          latitude: number;
          longitude: number;
          locationRange: number;
        }
      | undefined
    >
  >;
  hasRadius: boolean;
}

const LocationSearch = ({
  title,
  setGeoLocation,
  hasRadius,
}: LocationSearchProps) => {
  const { t } = useTranslation();
  const isLoaded = useLoadGoogleMaps(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  );
  const [open, setOpen] = useState(false);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [position, setPosition] =
    useState<google.maps.LatLngLiteral>(defaultCenter);
  const [radius, setRadius] = useState<number>(5000); // 5 km initial radius
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [circle, setCircle] = useState<google.maps.Circle | null>(null);

  const calculateBounds = (
    position: google.maps.LatLngLiteral,
    radius: number,
  ): google.maps.LatLngBounds | null => {
    if (!window.google) {
      return null;
    }
    const bounds = new google.maps.LatLngBounds();
    const center = new google.maps.LatLng(position.lat, position.lng);
    const circle = new google.maps.Circle({
      center,
      radius,
    });
    const circleBounds = circle.getBounds();
    if (circleBounds) {
      bounds.union(circleBounds);
      return bounds;
    }
    return null;
  };

  useEffect(() => {
    if (!window.google || !map || !hasRadius) return;

    if (circle) {
      circle.setMap(null);
    }

    const newCircle = new google.maps.Circle({
      map: map,
      center: position,
      radius: radius,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    setCircle(newCircle);

    const bounds = calculateBounds(position, radius);
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [map, position, radius, hasRadius]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setPosition(defaultCenter);
        },
      );
    } else {
      setPosition(defaultCenter);
    }
  }, []);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const newLocation: google.maps.LatLngLiteral = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setPosition(newLocation);
        map?.panTo(newLocation);

        if (place.geometry.viewport) {
          map?.fitBounds(place.geometry.viewport);
        } else {
          map?.setZoom(15);
        }
      }
    }
  };

  const onLoadAutocomplete = (
    autocomplete: google.maps.places.Autocomplete,
  ) => {
    autocompleteRef.current = autocomplete;
  };

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const handleRadiusChange = (value: string) => {
    const newRadius = Number(value);
    setRadius(newRadius);
  };

  const handleSubmit = () => {
    setGeoLocation({
      latitude: position.lat,
      longitude: position.lng,
      locationRange: hasRadius ? radius : 0,
    });
    setOpen(false);
  };

  if (!isLoaded) return <Button>{t("location.loading")}</Button>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="gap-2"
        >
          {title}
          <MapPin size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("location.title")}</DialogTitle>
          <DialogDescription>{t("location.description")}</DialogDescription>
        </DialogHeader>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div className="flex justify-between gap-3 py-3">
            <Autocomplete
              onLoad={onLoadAutocomplete}
              onPlaceChanged={onPlaceChanged}
              className="w-2/3"
            >
              <Input
                type="text"
                placeholder={t("location.searchPlaceholder")}
              />
            </Autocomplete>
            {hasRadius && (
              <div className="flex w-1/3">
                <Select onValueChange={handleRadiusChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("location.selectRadius")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {radiusOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value.toString()}
                        >
                          {option.text}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={10}
            onLoad={onMapLoad}
          >
            <Marker position={position} />
          </GoogleMap>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            {t("location.select")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationSearch;
