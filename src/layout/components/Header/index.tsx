"use client"

import Logo from "@/components/Logo"
import { getSessionAuth } from "@/utils/session"
import { twclx } from "@/utils/twclx"
import {
  Avatar,
  Button,
  Hide,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Skeleton,
  useColorMode,
} from "@chakra-ui/react"
import { css } from "@emotion/css"
import { RiLogoutCircleRLine, RiMoonLine, RiSunLine } from "@remixicon/react"
import { toString } from "lodash"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Case, Else, If, Switch, Then } from "react-if"

const Header = () => {
  const session = useSession()
  const auth = getSessionAuth(session)
  const isLoaded = session.status !== "loading"
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <header
      className={twclx([
        "w-full flex justify-between items-center h-12 px-6 sm:px-12 sticky top-0 shadow z-40",
        css`
          background-color: var(--chakra-colors-chakra-body-bg);
        `,
      ])}
    >
      <Link href={auth ? "/" : "/signin"}>
        <Logo />
      </Link>

      <div className="flex items-center space-x-2">
        <Skeleton isLoaded={isLoaded}>
          <Menu>
            <MenuButton as={Button} variant={"ghost"} size={"sm"}>
              <Switch>
                <Case condition={colorMode === "light"}>
                  <RiSunLine size={"1rem"} />
                </Case>
                <Case condition={colorMode === "dark"}>
                  <RiMoonLine size={"1rem"} />
                </Case>
              </Switch>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup value={colorMode} title="Theme" onChange={() => toggleColorMode()}>
                <MenuItemOption value="light">
                  <div className="flex items-center">
                    <RiSunLine size={"1rem"} className="mr-2" />
                    <span>Light</span>
                  </div>
                </MenuItemOption>
                <MenuItemOption value="dark">
                  <div className="flex items-center">
                    <RiMoonLine size={"1rem"} className="mr-2" />
                    <span>Dark</span>
                  </div>
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Skeleton>

        <Skeleton isLoaded={isLoaded}>
          <If condition={!!auth}>
            <Then>
              <Menu>
                <MenuButton as={Button} variant={"ghost"}>
                  <div className="flex items-center">
                    <Avatar name={toString(auth?.user?.name)} src={toString(auth?.user?.image)} size="sm" />
                    <div className="flex flex-col text-start ml-3">
                      <div>{auth?.user?.name}</div>
                      <Hide below="sm">
                        <div className="text-sm">{auth?.user?.email}</div>
                      </Hide>
                    </div>
                  </div>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => signOut()}>
                    <RiLogoutCircleRLine size={"1rem"} className="mr-2" />
                    <span>Sign out</span>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Then>
            <Else>
              <Button colorScheme="blue" onClick={() => signIn()} size={"sm"}>
                Sign in
              </Button>
            </Else>
          </If>
        </Skeleton>
      </div>
    </header>
  )
}

export default Header
