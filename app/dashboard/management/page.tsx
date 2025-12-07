"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Plus, Search, Package, Wrench, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const products = [
  {
    id: "1",
    name: "Enterprise License",
    description: "Full access license",
    price: 999,
    stock: 50,
    category: "Software",
    status: "active",
  },
  {
    id: "2",
    name: "Professional License",
    description: "Standard features",
    price: 499,
    stock: 100,
    category: "Software",
    status: "active",
  },
  {
    id: "3",
    name: "Starter Pack",
    description: "Basic features",
    price: 99,
    stock: 200,
    category: "Software",
    status: "active",
  },
  {
    id: "4",
    name: "Training Module",
    description: "Online training",
    price: 199,
    stock: 0,
    category: "Education",
    status: "inactive",
  },
]

const services = [
  {
    id: "1",
    name: "Web Development",
    description: "Custom web solutions",
    price: 5000,
    category: "Development",
    status: "active",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "iOS and Android apps",
    price: 8000,
    category: "Development",
    status: "active",
  },
  {
    id: "3",
    name: "UI/UX Design",
    description: "User interface design",
    price: 3000,
    category: "Design",
    status: "active",
  },
  {
    id: "4",
    name: "SEO Consulting",
    description: "Search optimization",
    price: 1500,
    category: "Marketing",
    status: "inactive",
  },
]

export default function ManagementPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Management" description="Manage your products and services">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </PageHeader>

      <Tabs defaultValue="services" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 w-64" />
          </div>
        </div>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>Manage your service offerings</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={services}
                columns={[
                  { key: "name", header: "Service Name" },
                  { key: "description", header: "Description", className: "hidden md:table-cell" },
                  { key: "category", header: "Category", className: "hidden sm:table-cell" },
                  {
                    key: "price",
                    header: "Price",
                    cell: (item) => `$${item.price.toLocaleString()}`,
                  },
                  {
                    key: "status",
                    header: "Status",
                    cell: (item) => (
                      <StatusBadge status={item.status} variant={item.status === "active" ? "success" : "error"} />
                    ),
                  },
                  {
                    key: "actions",
                    header: "",
                    cell: () => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your product inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={products}
                columns={[
                  { key: "name", header: "Product Name" },
                  { key: "description", header: "Description", className: "hidden md:table-cell" },
                  { key: "category", header: "Category", className: "hidden sm:table-cell" },
                  {
                    key: "price",
                    header: "Price",
                    cell: (item) => `$${item.price.toLocaleString()}`,
                  },
                  { key: "stock", header: "Stock" },
                  {
                    key: "status",
                    header: "Status",
                    cell: (item) => (
                      <StatusBadge status={item.status} variant={item.status === "active" ? "success" : "error"} />
                    ),
                  },
                  {
                    key: "actions",
                    header: "",
                    cell: () => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
