"use client"
 
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
 
export default function TransactionForm() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [cardNumber, setCardNumber] = useState("")
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
 
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number.parseFloat(amount),
        category,
        cardLastFourDigits: cardNumber.slice(-4),
      }),
    })
 
    if (response.ok) {
      router.push("/transactions")
    } else {
      // Handle error
      console.error("Failed to create transaction")
    }
  }
 
  return (
<form onSubmit={handleSubmit} className="space-y-4">
<div>
<Label htmlFor="amount">Amount</Label>
<Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
</div>
<div>
<Label htmlFor="category">Category</Label>
<Select value={category} onValueChange={setCategory} required>
<SelectTrigger>
<SelectValue placeholder="Select a category" />
</SelectTrigger>
<SelectContent>
<SelectItem value="food">Food</SelectItem>
<SelectItem value="transport">Transport</SelectItem>
<SelectItem value="entertainment">Entertainment</SelectItem>
            {/* Add more categories as needed */}
</SelectContent>
</Select>
</div>
<div>
<Label htmlFor="cardNumber">Card Number</Label>
<Input
          id="cardNumber"
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
</div>
<Button type="submit">Create Transaction</Button>
</form>
  )
}
 
tiene menú contextual