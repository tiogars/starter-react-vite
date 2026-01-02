import { useState, useEffect } from "react";
import type { ApiHealthProps } from "./ApiHealth.types";
import { useGetAlactuatorHealthQuery } from "../../store/actuatorApi";
import "./ApiHealth.css";

const ApiHealth = (props: ApiHealthProps) => {
  const { data, error, isLoading, startedTimeStamp } = useGetAlactuatorHealthQuery(null, {
    pollingInterval: 10000, // Vérifie toutes les 10 secondes
    refetchOnMountOrArgChange: true, // Recharge à chaque montage
  });

  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (startedTimeStamp) {
        const elapsed = Math.floor((Date.now() - startedTimeStamp) / 1000);
        const remaining = Math.max(0, 10 - elapsed);
        setCountdown(remaining);
      }
    }, 100); // Met à jour toutes les 100ms pour une animation fluide

    return () => clearInterval(interval);
  }, [startedTimeStamp]);

  let status: React.ReactNode;
  if (isLoading) {
    status = <span>Vérification...</span>;
  } else if (error) {
    status = <span className="api-health-error">API indisponible</span>;
  } else if (data?.status === 'UP') {
    status = <span className="api-health-success">API disponible</span>;
  } else {
    status = <span className="api-health-unknown">API état inconnu</span>;
  }

  return (
    <div>
      <strong>État de l'API :</strong> {status} {countdown <= 3 && countdown > 0 && `(next check in ${countdown}s)`}
    </div>
  );
};

export default ApiHealth;
