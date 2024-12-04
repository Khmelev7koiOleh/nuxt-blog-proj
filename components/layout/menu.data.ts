export interface IMenuItem {
  name: string;
  url: string;
  icon: string;
}

export const MENU_DATA: IMenuItem[] = [
  {
    name: "Home",
    url: "/",
    icon: "radix-icons:home",
  },
  {
    name: "Blogs",
    url: "/blog",
    icon: "radix-icons:component-1",
  },
  {
    name: "Profile",
    url: "/profile",
    icon: "radix-icons:avatar",
  },
];
