'use client';


import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from './components/shared/Navbar'
import Header from './components/header/Header'
import ProductListing from './components/productListing'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <ProductListing />
    </>
  )
}
