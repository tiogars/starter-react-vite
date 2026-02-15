import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAlactuatorHealthQuery } from "../../store/actuatorApi";
import { selectIsApiConfigured } from "../../store/apiConfigSlice";
import "./ApiHealth.css";

const ApiHealth = () => {
  const isApiConfigured = useSelector(selectIsApiConfigured);
  const { data, error, isLoading, startedTimeStamp } =
    useGetAlactuatorHealthQuery(null, {
      pollingInterval: 10000, // Recheck every 10s
      refetchOnMountOrArgChange: true, // Reload on each mount
      skip: !isApiConfigured, // Skip query if API is not configured
    });

  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (startedTimeStamp) {
        const elapsed = Math.floor((Date.now() - startedTimeStamp) / 1000);
        const remaining = Math.max(0, 10 - elapsed);
        setCountdown(remaining);
      }
    }, 100); // Update every 100ms for a smooth countdown

    return () => clearInterval(interval);
  }, [startedTimeStamp]);

  let status: React.ReactNode;
  
  if (!isApiConfigured) {
    status = (
      <span className="api-health-warning">
        <FiberManualRecordIcon
          sx={{ color: "warning.main", fontSize: 14, mr: 0.5 }}
        />
        API not configured
      </span>
    );
  } else if (isLoading) {
    status = (
      <span>
        <FiberManualRecordIcon
          sx={{ color: "text.secondary", fontSize: 14, mr: 0.5 }}
        />
        Checking...
      </span>
    );
  } else if (error) {
    status = (
      <span className="api-health-error">
        <FiberManualRecordIcon
          sx={{ color: "error.main", fontSize: 14, mr: 0.5 }}
        />
        API not OK
      </span>
    );
  } else if (data?.status === "UP") {
    status = (
      <span className="api-health-success">
        <FiberManualRecordIcon
          sx={{ color: "success.main", fontSize: 14, mr: 0.5 }}
        />
        API OK
      </span>
    );
  } else {
    status = (
      <span className="api-health-unknown">
        <FiberManualRecordIcon
          sx={{ color: "warning.main", fontSize: 14, mr: 0.5 }}
        />
        API status unknown
      </span>
    );
  }

  return (
    <div>
      {status}{" "}
      {isApiConfigured && countdown <= 3 && countdown > 0 && `(next check in ${countdown}s)`}
    </div>
  );
};

export default ApiHealth;
