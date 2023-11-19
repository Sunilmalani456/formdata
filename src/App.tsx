/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { Button } from "./components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const formSchema = z.object({
  description: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  category: z.string().min(1, {
    message: "Username must be at least 3 characters.",
  }),
  amount: z.coerce
    .number()
    .min(100, {
      message: "Please enter a minimum amount of 100$.",
    })
    .max(100_000, {
      message: "maximum amount is 100_000$.",
    }), // amount: z.number().min(18),

  // amount: z
  //   .string()
  //   .nonempty({
  //     message: "Please enter a valid product amount.",
  //   })
  //   .transform((val) => {
  //     return Number(val) || 0;
  //   }),

  // nonempty({
  //   message: "Please select a valid product category.",
  // }),
  // .refine(
  //   (val) => {
  //     return ["ABC", "DEF", "GHI"].includes(val);
  //   },
  //   {
  //     // message: "Please select your product category.",
  //   }
  // ),
});

interface FormData {
  id: number;
  description: string;
  category: string;
  amount: number;
}

function App() {
  const [formData, setFormData] = useState<FormData[]>([
    {
      id: 1,
      description: "Milk",
      category: "Groceries",
      amount: 150.0,
    },
    {
      id: 2,
      description: "Electricity",
      category: "Utilities",
      amount: 650.0,
    },
    {
      id: 3,
      description: "Movies",
      category: "Entertainment",
      amount: 550.0,
    },
    {
      id: 4,
      description: "Electricity",
      category: "Utilities",
      amount: 350.0,
    },
    {
      id: 5,
      description: "Skydiving",
      category: "Entertainment",
      amount: 1050.0,
    },
  ]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      category: "",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      amount: "" as any,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const description = values.description;
    const category = values.category;
    const amount = values.amount;
    setFormData([
      ...formData,
      {
        id: formData.length + 1,
        description,
        category,
        amount,
      },
    ]);

    form.reset();
    // console.log("values", values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-black font-medium underline">
                  Description / Name :
                </FormLabel>
                <FormDescription className="text-sm text-black font-medium">
                  Please describe your product name...
                </FormDescription>
                <FormControl>
                  <Input type="text" placeholder="Description..." {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-black font-medium underline">
                  Amount :
                </FormLabel>
                <FormDescription className="text-sm text-black font-medium">
                  Please Enter your product amount...
                </FormDescription>
                <FormControl>
                  <Input type="number" placeholder="Amount..." {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-black font-medium underline">
                  Category :
                </FormLabel>
                <FormDescription className="text-sm text-black font-medium">
                  Please select your product category...
                </FormDescription>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select your product category..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value="groceries">Groceries</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button className="bg-black/80 text-white" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <div className="mt-4">
        <Table className="border">
          <TableCaption className="font-medium text-lg">
            A list of your recent items 🛍
          </TableCaption>
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-[100px]">Description</TableHead>
              <TableHead className="">Category</TableHead>
              <TableHead className="text-center">Delete</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formData.map((data, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  {data.description}
                </TableCell>
                <TableCell>{data.category}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      setFormData(
                        formData.filter((item) => item.id !== data.id)
                      )
                    }
                    className="bg-gray-800 shadow-md text-white"
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell className="text-right">${data.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                ${formData.reduce((acc, value) => value.amount + acc, 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}

export default App;
