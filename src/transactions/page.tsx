"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";

export default function CreateTransaction() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your transaction creation logic here
    console.log({ amount, category, cardNumber });
    // Redirect to transactions list or show success message
    router.push("/transactions");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          type="text"
          value={cardNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardNumber(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Create Transaction</Button>
    </form>
  );
}