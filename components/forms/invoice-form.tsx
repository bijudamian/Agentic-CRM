"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Trash2 } from "lucide-react"

interface InvoiceFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: InvoiceFormData) => void
}

interface InvoiceItem {
  description: string
  quantity: number
  rate: number
}

interface InvoiceFormData {
  customerName: string
  customerEmail: string
  dueDate: string
  items: InvoiceItem[]
  notes: string
}

export function InvoiceForm({ open, onOpenChange, onSubmit }: InvoiceFormProps) {
  const [formData, setFormData] = useState<InvoiceFormData>({
    customerName: "",
    customerEmail: "",
    dueDate: "",
    items: [{ description: "", quantity: 1, rate: 0 }],
    notes: "",
  })

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", quantity: 1, rate: 0 }],
    })
  }

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    })
  }

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    setFormData({ ...formData, items: newItems })
  }

  const total = formData.items.reduce((sum, item) => sum + item.quantity * item.rate, 0)

  const handleSubmit = () => {
    onSubmit?.(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>Generate a new invoice for your customer</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                placeholder="Customer name"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Customer Email *</Label>
              <Input
                id="customerEmail"
                type="email"
                placeholder="customer@example.com"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Line Items</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </div>
            {formData.items.map((item, index) => (
              <div key={index} className="grid gap-2 p-3 rounded-lg border bg-muted/30">
                <div className="space-y-2">
                  <Input
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Qty</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Rate ($)</Label>
                    <Input
                      type="number"
                      min="0"
                      value={item.rate}
                      onChange={(e) => updateItem(index, "rate", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1 space-y-1">
                      <Label className="text-xs">Total</Label>
                      <div className="h-9 px-3 py-2 rounded-md bg-muted text-sm font-medium">
                        ${(item.quantity * item.rate).toLocaleString()}
                      </div>
                    </div>
                    {formData.items.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(index)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
            <span className="font-medium">Total Amount</span>
            <span className="text-xl font-bold text-primary">${total.toLocaleString()}</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes for the customer..."
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Invoice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
