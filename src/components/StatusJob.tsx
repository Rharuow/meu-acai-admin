import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { updateStatus } from "../service/docs/admin/status";
import { useStoreContext } from "../context/store";
import ReactLoading from "../rharuow-admin/components/ReactLoading";

function StatusJob() {
  const {
    isOpen,
    storeLoading: loading,
    storeSetLoading: setLoading,
    setIsOpen,
  } = useStoreContext();

  const handleStatus = async () => {
    setLoading(true);
    await updateStatus(!isOpen);
    setIsOpen((prevState) => !prevState);
    setLoading(false);
  };

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
            checked={isOpen}
            onColor="#198754"
            offColor="#ff4136"
          />
        )}
      </label>
    </div>
  );
}

export default StatusJob;
