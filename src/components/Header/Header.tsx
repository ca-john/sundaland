import { FunctionComponent, useEffect } from 'react';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
// Created custom logo
import logo from '/logo.svg';
import { CartWidget } from '../CartWidget';
import { CartProps } from '../Products/Items.tsx';
import useLocalStorageState from 'use-local-storage-state';

import { useAuthenticator } from '@aws-amplify/ui-react';


import {
  Button
} from "@aws-amplify/ui-react";


export const Header: FunctionComponent = () => {



  // We need to shrink the header when the user scrolls down, 
  // so we need to add an event listener to the window object
  useEffect(() => {
    window.addEventListener("scroll", () => updateHeader(), false)

    return () => {
      window.removeEventListener("scroll", () => updateHeader())
    }
  }, [])

  const updateHeader = () => {
    const SCROLL_MARGIN = 125
    const mainHeader = document.querySelector("header") as HTMLElement
    const leftLogo = document.querySelectorAll("img")[0] as HTMLElement
    const cartIcon = document.querySelectorAll("img")[1] as HTMLElement
    const productNumIcon = document.querySelector("span") as HTMLElement
    const scrollY = document.body.scrollTop || document.documentElement.scrollTop

    if (scrollY > SCROLL_MARGIN) {
      mainHeader.style.transition = "height 250ms ease-in"
      mainHeader.style.height = "70px"
      leftLogo.style.transition = "height 250ms ease-in"
      leftLogo.style.height = "35%"
      leftLogo.style.width = "35%"
      cartIcon.style.transition = "height 150ms ease-in"
      cartIcon.style.height = "8%"
      cartIcon.style.width = "8%"
      productNumIcon.style.transition = "font-size 250ms ease-in"
      productNumIcon.style.fontSize = "1.5em"
    } else {
      mainHeader.style.height = "115px"
      leftLogo.style.height = "40%"
      leftLogo.style.width = "40%"
      cartIcon.style.height = "10%"
      cartIcon.style.width = "10%"
      productNumIcon.style.fontSize = "2em"
    }
  }
  const [cart,] = useLocalStorageState<CartProps>('cart', {})

  const numProd: number = Object.keys(cart || {}).length


  const { user, signOut } = useAuthenticator((context) => [context.user]);



  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src={logo} className={styles.logo} alt="Shopping Cart Application" />
        </Link>
      </div>



      <div className={styles.logos}>
        <CartWidget productsCount={numProd} />
        <div className={styles.welcomeMessage}>Welcome, {user.username}!</div>
        <Button className={styles.button} onClick={signOut}>Sign Out</Button>
      </div>

    </header>
  )
}