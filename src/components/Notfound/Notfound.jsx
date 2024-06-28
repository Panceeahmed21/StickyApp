import React, { useEffect, useState } from "react";
import style from "./Notfound.module.css";

import notfound from "../../assets/not found.jpg";

export default function Notfound() {
  return (
    <div className="row flex-column align-items-center ">
    <div className="col-md-2 ">
    <img src={notfound} className="w-100   my-5 rounded-5 " alt="" />
    </div>
    <div className="col-md-8 text-center">
      <h2>Awww..Don't Cry  this page is only not found</h2>
    </div>
    </div>
  );
}
