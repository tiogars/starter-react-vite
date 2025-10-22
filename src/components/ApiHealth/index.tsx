import React from "react";
import { useGetAlactuatorHealthQuery } from "../../store/actuatorApi";
import "./ApiHealth.css";

const ApiHealth: React.FC = () => {
  const { data, error, isLoading } = useGetAlactuatorHealthQuery(null, {
    pollingInterval: 10000, // Vérifie toutes les 10 secondes
    refetchOnMountOrArgChange: true, // Recharge à chaque montage
  });

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
      <strong>État de l'API :</strong> {status}
    </div>
  );
};

export default ApiHealth;
