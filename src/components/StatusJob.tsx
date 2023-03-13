import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { getStatus, updateStatus } from "../service/docs/store";
import useSWR from "swr";
import ReactLoading from "../rharuow-admin/components/ReactLoading";

function StatusJob() {
  const { data: status, isLoading, error } = useSWR("status/", getStatus);

  const [loading, setLoading] = useState<boolean>(isLoading);
  const [isOpen, setIsOpen] = useState(status);

  const handleStatus = async () => {
    setLoading(true);
    await updateStatus(!isOpen);
    setIsOpen(!isOpen);
    error && console.log("error StatusJob = ", error);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <div className="w-100 mb-3">
      <label className="d-flex align-items-center justify-content-end">
        <span className="text-primary-light fw-bold me-3">
          {isOpen ? "Aberto" : "Fechado"}
        </span>
        {loading ? (
          <>
            <ReactLoading type="spinningBubbles" color="#46295a" height={28} />
          </>
        ) : (
          <Switch
            onChange={handleStatus}
            checked={!!isOpen}
            onColor="#198754"
            offColor="#ff4136"
          />
        )}
      </label>
    </div>
  );
}

export default StatusJob;
