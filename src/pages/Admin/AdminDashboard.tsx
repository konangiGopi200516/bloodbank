import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Building, 
  Droplets, 
  AlertTriangle,
  TrendingUp,
  Activity,
  Search,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Heart
} from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dashboardStats = [
    {
      title: "Total Donors",
      value: "12,847",
      change: "+5.2%",
      icon: Users,
      color: "text-primary",
      detail: "Active donors in system"
    },
    {
      title: "Partner Hospitals",
      value: "156",
      change: "+2.1%",
      icon: Building,
      color: "text-success",
      detail: "Registered hospitals"
    },
    {
      title: "Blood Units Available",
      value: "2,341",
      change: "-1.5%",
      icon: Droplets,
      color: "text-warning",
      detail: "Total units across all blood banks"
    },
    {
      title: "Critical Requests",
      value: "23",
      change: "+12.3%",
      icon: AlertTriangle,
      color: "text-destructive",
      detail: "Urgent blood requests"
    }
  ];

  const analyticsData = [
    {
      title: "Monthly Donations",
      current: 3247,
      previous: 2891,
      trend: "up",
      percentage: "+12.3%"
    },
    {
      title: "Blood Requests",
      current: 1567,
      previous: 1432,
      trend: "up",
      percentage: "+9.4%"
    },
    {
      title: "Successful Matches",
      current: 1234,
      previous: 1156,
      trend: "up",
      percentage: "+6.8%"
    },
    {
      title: "Emergency Response Time",
      current: "2.3 hrs",
      previous: "3.1 hrs",
      trend: "down",
      percentage: "-25.8%"
    }
  ];

  const bloodTypeDistribution = [
    { type: "O+", count: 3847, percentage: 37.2, demand: "High" },
    { type: "A+", count: 2654, percentage: 25.7, demand: "High" },
    { type: "B+", count: 1876, percentage: 18.2, demand: "Medium" },
    { type: "AB+", count: 743, percentage: 7.2, demand: "Low" },
    { type: "O-", count: 521, percentage: 5.0, demand: "Critical" },
    { type: "A-", count: 398, percentage: 3.9, demand: "Medium" },
    { type: "B-", count: 234, percentage: 2.3, demand: "Low" },
    { type: "AB-", count: 74, percentage: 0.7, demand: "Critical" }
  ];

  const regionalStats = [
    {
      region: "North District",
      donors: 3421,
      hospitals: 45,
      bloodUnits: 892,
      requests: 234
    },
    {
      region: "South District", 
      donors: 2876,
      hospitals: 38,
      bloodUnits: 756,
      requests: 198
    },
    {
      region: "East District",
      donors: 3124,
      hospitals: 42,
      bloodUnits: 823,
      requests: 267
    },
    {
      region: "West District",
      donors: 3426,
      hospitals: 31,
      bloodUnits: 870,
      requests: 189
    }
  ];

  const recentDonors = [
    {
      id: 1,
      name: "John Smith",
      bloodType: "O+",
      lastDonation: "2024-01-15",
      status: "eligible",
      donationCount: 8,
      location: "New York, NY"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      bloodType: "A-",
      lastDonation: "2024-01-10",
      status: "not-eligible",
      donationCount: 15,
      location: "Los Angeles, CA"
    },
    {
      id: 3,
      name: "Mike Davis",
      bloodType: "B+",
      lastDonation: "2023-12-20",
      status: "eligible",
      donationCount: 3,
      location: "Chicago, IL"
    }
  ];

  const bloodInventory = [
    { type: "A+", available: 145, required: 120, status: "good" },
    { type: "A-", available: 67, required: 80, status: "low" },
    { type: "B+", available: 98, required: 90, status: "good" },
    { type: "B-", available: 34, required: 50, status: "critical" },
    { type: "AB+", available: 28, required: 30, status: "low" },
    { type: "AB-", available: 12, required: 20, status: "critical" },
    { type: "O+", available: 210, required: 200, status: "good" },
    { type: "O-", available: 45, required: 80, status: "low" }
  ];

  const hospitals = [
    {
      id: 1,
      name: "Central Medical Center",
      address: "123 Healthcare Ave, Downtown",
      status: "active",
      lastRequest: "2024-01-16",
      totalRequests: 45,
      bloodTypes: ["O+", "A+", "B+"]
    },
    {
      id: 2,
      name: "St. Mary's Hospital",
      address: "456 Medical St, Uptown",
      status: "active",
      lastRequest: "2024-01-15",
      totalRequests: 32,
      bloodTypes: ["O-", "AB+", "A-"]
    }
  ];

  const emergencyRequests = [
    {
      id: 1,
      hospital: "Emergency General",
      bloodType: "O-",
      units: 5,
      urgency: "critical",
      timeLeft: "2 hours",
      location: "Downtown"
    },
    {
      id: 2,
      hospital: "City Medical",
      bloodType: "A+",
      units: 3,
      urgency: "urgent",
      timeLeft: "6 hours",
      location: "Midtown"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-success";
      case "low": return "text-warning";
      case "critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string): "secondary" | "destructive" | "default" | "outline" => {
    switch (status) {
      case "good": return "secondary";
      case "low": return "secondary";
      case "critical": return "destructive";
      case "active": return "secondary";
      case "eligible": return "secondary";
      case "not-eligible": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage blood inventory, donors, hospitals, and emergency requests
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Hospital
            </Button>
            <Button variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="medical-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mb-1">
                    <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                      {stat.change}
                    </span>
                    {" "}from last month
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.detail}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
            <TabsTrigger value="inventory">Blood Inventory</TabsTrigger>
            <TabsTrigger value="donors">Donors</TabsTrigger>
            <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Requests</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Blood Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Droplets className="h-5 w-5 text-primary" />
                  <span>Blood Inventory Status</span>
                </CardTitle>
                <CardDescription>
                  Current blood stock levels across all blood banks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {bloodInventory.map((blood) => (
                    <div key={blood.type} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-lg">
                          {blood.type}
                        </Badge>
                        <Badge variant={getStatusBadge(blood.status)}>
                          {blood.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Available:</span>
                          <span className={`font-medium ${getStatusColor(blood.status)}`}>
                            {blood.available}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Required:</span>
                          <span>{blood.required}</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full">
                        <Edit className="h-3 w-3 mr-1" />
                        Update
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donors Tab */}
          <TabsContent value="donors" className="space-y-6">
            <Card className="medical-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Registered Donors</span>
                  </CardTitle>
                  <CardDescription>
                    Manage and monitor donor information
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search donors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDonors.map((donor) => (
                    <div key={donor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Heart className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{donor.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {donor.location} • {donor.donationCount} donations
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary">{donor.bloodType}</Badge>
                        <Badge variant={getStatusBadge(donor.status)}>
                          {donor.status === "eligible" ? "Eligible" : "Not Eligible"}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          Last: {donor.lastDonation}
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hospitals Tab */}
          <TabsContent value="hospitals" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-primary" />
                  <span>Partner Hospitals</span>
                </CardTitle>
                <CardDescription>
                  Monitor hospital partnerships and blood requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hospitals.map((hospital) => (
                    <div key={hospital.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{hospital.name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{hospital.address}</span>
                          </p>
                        </div>
                        <Badge variant={getStatusBadge(hospital.status)}>
                          {hospital.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Total Requests:</span>
                          <span className="font-medium ml-2">{hospital.totalRequests}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Request:</span>
                          <span className="font-medium ml-2">{hospital.lastRequest}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Blood Types:</span>
                          <div className="flex space-x-1 mt-1">
                            {hospital.bloodTypes.map((type) => (
                              <Badge key={type} variant="outline" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Requests Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <Card className="medical-card border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Emergency Blood Requests</span>
                </CardTitle>
                <CardDescription>
                  Critical and urgent blood requests requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyRequests.map((request) => (
                    <div key={request.id} className="p-4 border border-destructive/30 rounded-lg bg-background">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-destructive">{request.hospital}</h4>
                          <p className="text-sm text-muted-foreground flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{request.location}</span>
                          </p>
                        </div>
                        <Badge variant="destructive">
                          {request.urgency}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Blood Type:</span>
                          <Badge variant="secondary" className="ml-2">
                            {request.bloodType}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Units Needed:</span>
                          <span className="font-medium ml-2">{request.units}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 text-destructive mr-1" />
                          <span className="text-destructive font-medium">{request.timeLeft} left</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="destructive">
                          Fulfill Request
                        </Button>
                        <Button size="sm" variant="outline">
                          Contact Hospital
                        </Button>
                        <Button size="sm" variant="outline">
                          Find Donors
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-primary" />
                    <span>Performance Analytics</span>
                  </CardTitle>
                  <CardDescription>
                    Monthly trends and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{metric.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Current: {metric.current} | Previous: {metric.previous}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={metric.trend === 'up' ? 'default' : 'secondary'}
                          >
                            {metric.percentage}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    <span>Blood Type Distribution</span>
                  </CardTitle>
                  <CardDescription>
                    Donor distribution by blood type and demand levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bloodTypeDistribution.map((type, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">{type.type}</Badge>
                          <span className="text-sm">{type.count} donors</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{type.percentage}%</span>
                          <Badge 
                            variant={type.demand === 'Critical' ? 'destructive' : 
                                     type.demand === 'High' ? 'default' : 'outline'}
                          >
                            {type.demand}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Regional Statistics</span>
                </CardTitle>
                <CardDescription>
                  Performance metrics by geographical region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Region</th>
                        <th className="text-left p-2">Donors</th>
                        <th className="text-left p-2">Hospitals</th>
                        <th className="text-left p-2">Blood Units</th>
                        <th className="text-left p-2">Requests</th>
                        <th className="text-left p-2">Efficiency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regionalStats.map((region, index) => {
                        const efficiency = ((region.bloodUnits / region.requests) * 100).toFixed(1);
                        return (
                          <tr key={index} className="border-b">
                            <td className="p-2 font-medium">{region.region}</td>
                            <td className="p-2">{region.donors.toLocaleString()}</td>
                            <td className="p-2">{region.hospitals}</td>
                            <td className="p-2">{region.bloodUnits}</td>
                            <td className="p-2">{region.requests}</td>
                            <td className="p-2">
                              <Badge variant={parseFloat(efficiency) > 80 ? 'default' : 'outline'}>
                                {efficiency}%
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-lg">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Database Status</span>
                      <Badge variant="default">Healthy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>API Response Time</span>
                      <Badge variant="default">120ms</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Server Uptime</span>
                      <Badge variant="default">99.9%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Active Sessions</span>
                      <Badge variant="secondary">1,247</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>New donors registered</span>
                      <span className="text-success">+47</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Blood donations completed</span>
                      <span className="text-success">+123</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Emergency requests resolved</span>
                      <span className="text-success">+89</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New hospitals onboarded</span>
                      <span className="text-success">+5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      Generate Monthly Report
                    </Button>
                    <Button className="w-full" variant="outline">
                      Export Donor Data
                    </Button>
                    <Button className="w-full" variant="outline">
                      System Backup
                    </Button>
                    <Button className="w-full" variant="destructive">
                      Emergency Alert
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;