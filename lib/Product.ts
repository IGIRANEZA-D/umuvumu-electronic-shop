import mongoose, { Schema, models } from "mongoose";

const SpecSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    slug: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    purchasePrice: { type: Number, min: 0 }, // For intelligence: ROI calculations
    originalPrice: { type: Number, min: 0 },
    category: { type: String, required: true, index: true },
    brand: { type: String, required: true, trim: true },
    badge: { type: String },
    inStock: { type: Boolean, default: true },
    stock: { type: Number, default: 0, min: 0 }, // Low stock alerts logic will use this
    images: [{ type: String }],
    specs: [SpecSchema],
    rating: { type: Number, default: 4.8 },
    reviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const CategorySchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "Package" },
    gradient: { type: String, default: "from-orange-500 to-slate-900" },
    color: { type: String, default: "#f97316" },
  },
  { timestamps: true }
);

const AuditLogSchema = new Schema(
  {
    action: { type: String, required: true, index: true },
    details: { type: String, required: true },
    user: { type: String, default: "Admin" },
    status: { type: String, default: "success" },
    entityType: { type: String, default: "System" },
    entityId: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const OrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: { type: String, required: true },
    email: { type: String, default: "" },
    amount: { type: Number, required: true, min: 0 },
    items: { type: Number, default: 1, min: 1 },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Musanze Warehouse", "In Transit", "Delivered", "Cancelled"],
      default: "Pending",
    },
    fulfillment: [
      {
        label: String,
        completedAt: Date,
        note: String,
      },
    ],
  },
  { timestamps: true }
);

const ExpenseSchema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, enum: ['Rent', 'Salary', 'Marketing', 'Utilities', 'Taxes', 'Other'], required: true },
  date: { type: Date, default: Date.now },
  note: String,
}, { timestamps: true });

const LoanSchema = new Schema({
  borrower: { type: String, required: true },
  amount: { type: Number, required: true },
  remainingBalance: { type: Number, required: true },
  dueDate: Date,
  status: { type: String, enum: ['Active', 'Paid', 'Overdue'], default: 'Active' },
  history: [{ date: Date, amount: Number, note: String }],
}, { timestamps: true });

const SalesReportSchema = new Schema({
  period: { type: String, required: true }, // e.g., "Jan-2027"
  totalRevenue: Number,
  totalProfit: Number,
  topProducts: [{ productId: Schema.Types.ObjectId, quantity: Number }],
  expenseTotal: Number,
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export const AuditLog = mongoose.models.AuditLog || mongoose.model("AuditLog", AuditLogSchema);
export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export const Expense = mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
export const Loan = mongoose.models.Loan || mongoose.model("Loan", LoanSchema);
export const SalesReport = mongoose.models.SalesReport || mongoose.model("SalesReport", SalesReportSchema);

export default Product;
