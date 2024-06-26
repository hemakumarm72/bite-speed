import sequelizeConnection from "../db.connect";
import { NewContactDocument } from "../@types/index";
import { DataTypes, Model, Optional } from "sequelize";
// import bcrypt from 'bcrypt';

export interface ContactInput extends Optional<NewContactDocument, "id"> {}

interface ContactSchema
  extends Model<NewContactDocument, ContactInput>,
    NewContactDocument {
  createdAt?: Date;
  updatedAt?: Date;
}

const Contact = sequelizeConnection.define<ContactSchema>(
  "contact",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      // defaultValue: DataTypes.UUIDV1,
      unique: true,
    },
    phoneNumber: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
      defaultValue: null,
    },
    linkedId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    linkPrecedence: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "primary",
      validate: {
        isIn: [["primary", "secondary"]], // Validate that the value is one of the enum values
      },
    },

    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    paranoid: true, //TODO: soft delete option to our model; this imposes a soft delete on the model by adding a deletedAt
    hooks: {
      // beforeCreate: (member) => {
      //   member.password = bcrypt.hashSync(member.password, 10); // hash password
      // },
      // beforeUpdate:  (member) => {
      //   if (member.password) {
      //     member.password = bcrypt.hashSync(member.password, 10);
      //   }
      // },
    },
    //   underscored: true,
  }
);

export default Contact;
