"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Plus,
  Search,
  MessageSquare,
  Phone,
  Mail,
  HelpCircle,
  FileText,
  ExternalLink,
  Clock,
  CheckCircle2,
} from "lucide-react"

const myTickets = [
  {
    id: "TKT-001",
    subject: "Payment not processed",
    status: "in-progress",
    priority: "high",
    createdAt: "Dec 5, 2025",
    lastUpdate: "Dec 6, 2025",
  },
  {
    id: "TKT-002",
    subject: "App login issues",
    status: "resolved",
    priority: "medium",
    createdAt: "Nov 28, 2025",
    lastUpdate: "Nov 30, 2025",
  },
]

const faqItems = [
  {
    question: "How do I reset my password?",
    answer:
      "You can reset your password by clicking on 'Forgot Password' on the login page. You'll receive an email with instructions to create a new password.",
  },
  {
    question: "How do I update my payment method?",
    answer:
      "Go to your Profile settings, select the 'Payment Methods' tab, and click 'Add New Card' or edit your existing payment method.",
  },
  {
    question: "Can I get a refund for my purchase?",
    answer:
      "Yes, refund requests can be made within 30 days of purchase. Contact support with your order details and reason for refund.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "Navigate to Profile > Subscription and click 'Cancel Subscription'. Your access will continue until the end of your current billing period.",
  },
]

export function PersonalSupport() {
  return (
    <div className="space-y-6">
      <PageHeader title="Support" description="Get help and contact support">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
              <DialogDescription>Describe your issue and we'll help you resolve it</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="type">Issue Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="billing">Billing Issue</SelectItem>
                    <SelectItem value="technical">Technical Problem</SelectItem>
                    <SelectItem value="account">Account Issue</SelectItem>
                    <SelectItem value="service">Service Complaint</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of your issue" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Please provide details about your issue..." rows={4} />
              </div>
            </div>
            <DialogFooter>
              <Button>Submit Ticket</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Tickets</CardTitle>
              <CardDescription>Track your support requests</CardDescription>
            </CardHeader>
            <CardContent>
              {myTickets.length > 0 ? (
                <div className="space-y-4">
                  {myTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{ticket.subject}</p>
                            <StatusBadge
                              status={ticket.status.replace("-", " ")}
                              variant={ticket.status === "resolved" ? "success" : "warning"}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">{ticket.id}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {ticket.status === "resolved" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          )}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Created: {ticket.createdAt}</span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No support tickets yet</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>Get in touch with our team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <MessageSquare className="mr-3 h-5 w-5" />
                Live Chat
                <span className="ml-auto text-xs text-green-500">Online</span>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Phone className="mr-3 h-5 w-5" />
                Call Support
                <span className="ml-auto text-xs text-muted-foreground">24/7</span>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="mr-3 h-5 w-5" />
                Email Us
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Helpful guides and documentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-3 h-5 w-5" />
                User Guide
                <ExternalLink className="ml-auto h-4 w-4" />
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <HelpCircle className="mr-3 h-5 w-5" />
                Help Center
                <ExternalLink className="ml-auto h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search help articles..." className="pl-9" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
