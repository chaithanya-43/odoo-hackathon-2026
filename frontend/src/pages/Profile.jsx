import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getProfile } from "../services/api";

function Profile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProfile();

      setProfile(response?.data || {});
    } catch (err) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">

          <div className="page-header">
            <div>
              <h1>Profile</h1>
              <p>View your account information</p>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {loading ? (
            <div className="loading">
              Loading profile...
            </div>
          ) : (
            <div className="profile-card">

              <div className="profile-avatar">
                <i className="bx bx-user"></i>
              </div>

              <div className="profile-info">

                <div className="profile-field">
                  <span>Name</span>
                  <strong>
                    {profile.name || "-"}
                  </strong>
                </div>

                <div className="profile-field">
                  <span>Email</span>
                  <strong>
                    {profile.email || "-"}
                  </strong>
                </div>

                <div className="profile-field">
                  <span>Role</span>
                  <strong>
                    {profile.role || "-"}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Profile;