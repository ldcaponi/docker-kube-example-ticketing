import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Order, OrderStatus } from "./order";

interface TicketAttrs {
  title: string;
  price: number;
  id: string;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<Boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
  findByIdAndPrevVersion(event: {
    id: string;
    version: number;
  }): Promise<TicketDoc | null>;
}

const schema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

schema.set("versionKey", "version");
schema.plugin(updateIfCurrentPlugin);

schema.statics.build = (attrs: TicketAttrs): TicketDoc => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  });
};

schema.statics.findByIdAndPrevVersion = (event: {
  id: string;
  version: number;
}) => {
  return Ticket.findOne({ _id: event.id, version: event.version - 1 });
};

schema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });
  return !!existingOrder;
};

export const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", schema);
