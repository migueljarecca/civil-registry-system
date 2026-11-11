import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../../components/main/Sidebar/AdminSidebar';
import styles from './DashboardLayout.module.css';
import { AdminTopbar } from '../../components/main/Header/AdminTopbar';
import { useState } from 'react';

export const DashboardLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  return (
    <div className={styles.layout}>
      <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* If the sidebar is open on mobile, we place a dark overlay behind it. */}
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar} aria-hidden="true" />
      )}

      <div className={styles.mainWrapper}>
        <AdminTopbar onMenuClick={toggleSidebar} />

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};