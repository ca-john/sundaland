import { FunctionComponent, useEffect } from 'react'
import classes from './header.module.scss'
import { Link } from 'react-router-dom'
// Created custom logo
import logo from '/logo.svg'
import { CartWidget } from '../CartWidget'
import { CartProps } from '../Products/Products.tsx'
import useLocalStorageState from 'use-local-storage-state'



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
        headerElement.style.transition = "height 150ms ease-in"
        headerElement.style.height = "50px"
        logoElement.style.transition = "height 150ms ease-in"
        logoElement.style.height = "4rem"
        cartWidgetElement.style.transition = "height 150ms ease-in"
        cartWidgetElement.style.height = "1.5rem"
        productsCountElement.style.transition = "font-size 150ms ease-in"
        productsCountElement.style.fontSize = "1.5em"
      } else {
        headerElement.style.height = "125px"
        logoElement.style.height = "5rem"
        cartWidgetElement.style.height = "2rem"
        productsCountElement.style.fontSize = "1.5em"
      }
    }
    const [cart,] = useLocalStorageState<CartProps>('cart', {})
  
    const productsCount: number = Object.keys(cart || {}).length
  
    return (
      <header className={classes.header}>
        <div>
          <Link to="/">
            <img src={logo} className={classes.logo} alt="Shopping Cart Application" />
          </Link>
        </div>
        <div>
          <CartWidget productsCount={productsCount} />
        </div>
      </header>
    )
  }