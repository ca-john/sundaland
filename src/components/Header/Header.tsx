import { FunctionComponent, useEffect } from 'react';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
// Created custom logo
import logo from '/logo.svg';
import loginLogo from '/login.svg';
import { CartWidget } from '../CartWidget';
import { CartProps } from '../Products/Items.tsx';
import useLocalStorageState from 'use-local-storage-state';

import { useAuthenticator } from '@aws-amplify/ui-react';


import {
  withAuthenticator,
  Authenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
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
      const DISTANCE_FROM_TOP = 125
      const headerElement = document.querySelector("header") as HTMLElement
      const logoElement = document.querySelectorAll("img")[0] as HTMLElement
      const cartWidgetElement = document.querySelectorAll("img")[1] as HTMLElement
      const productsCountElement = document.querySelector("span") as HTMLElement
      const scrollY = document.body.scrollTop || document.documentElement.scrollTop
  
      if (scrollY > DISTANCE_FROM_TOP) {
        headerElement.style.transition = "height 250ms ease-in"
        headerElement.style.height = "70px"
        logoElement.style.transition = "height 250ms ease-in"
        logoElement.style.height = "35%"
        logoElement.style.width = "35%"
        cartWidgetElement.style.transition = "height 150ms ease-in"
        cartWidgetElement.style.height = "10%"
        cartWidgetElement.style.width = "10%"
        productsCountElement.style.transition = "font-size 250ms ease-in"
        productsCountElement.style.fontSize = "1.5em"
      } else {
        headerElement.style.height = "115px"
        logoElement.style.height = "40%"
        logoElement.style.width = "40%"
        cartWidgetElement.style.height = "15%"
        cartWidgetElement.style.width = "15%"
        productsCountElement.style.fontSize = "2em"
      }
    }
    const [cart,] = useLocalStorageState<CartProps>('cart', {})
  
    const productsCount: number = Object.keys(cart || {}).length
  

    const { user, signOut } = useAuthenticator((context) => [context.user]);



    return (
      <header className={styles.header}>
        <div>
          <Link to="/">
            <img src={logo} className={styles.logo} alt="Shopping Cart Application" />
          </Link>
        </div>

       

        <div className={styles.logos}>
          <CartWidget productsCount={productsCount} />
          <div className={styles.welcomeMessage}>Welcome, {user.username}!</div>
          <Button className={styles.button} onClick={signOut}>Sign Out</Button>
        </div>
      
      </header>
    )
  }