import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Image, Users, Building2, Mail, LogOut, ArrowLeft } from "lucide-react";

const AdminDashboard = () => {
  const { isAuthenticated, isReady, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Dashboard - Et Tech X";
    if (isReady && !isAuthenticated) {
      navigate("/admin/login", { replace: true });
    }
  }, [isAuthenticated, isReady, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar hideMenuItems />
      
      <section className="relative min-h-screen py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage gallery, speakers, sponsors, and newsletters</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Site
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Management Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Gallery Manager Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Image className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Gallery Manager</h3>
                <p className="text-muted-foreground mb-6">
                  Upload and manage gallery images, organize by year and category
                </p>
                <Link to="/admin/gallery">
                  <Button className="w-full">
                    Manage Gallery
                  </Button>
                </Link>
              </motion.div>

              {/* Speakers Manager Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Users className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Speakers Manager</h3>
                <p className="text-muted-foreground mb-6">
                  Add, edit, and manage speakers and speaker groups
                </p>
                <Link to="/admin/speakers">
                  <Button className="w-full">
                    Manage Speakers
                  </Button>
                </Link>
              </motion.div>

              {/* Sponsors Manager Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Building2 className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Sponsors Manager</h3>
                <p className="text-muted-foreground mb-6">
                  Add, edit, and manage sponsors and partners
                </p>
                <Link to="/admin/sponsors">
                  <Button className="w-full">
                    Manage Sponsors
                  </Button>
                </Link>
              </motion.div>

              {/* Newsletter Manager Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Newsletter Manager</h3>
                <p className="text-muted-foreground mb-6">
                  Create and manage email newsletters
                </p>
                <Link to="/admin/newsletter">
                  <Button className="w-full">
                    Manage Newsletter
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
