import React, { useState } from "react";
import Header from '../header'
import MainArticle from './main-article'
import Navigation from '../navigation'
import Footer from '../footer'

export default function Main() {

  const [tmp, setTmp] = useState<number>(0);
  return (
    <>
        <MainArticle />
    </>
  )
}
