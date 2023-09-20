export interface MenuItem {
  key: string
  label: string
  icon: string
  iconList?: string
  to?: string
  color?: string
  children?: {
    key: string
    label: string
    icon?: string
    iconList?: string
    to?: string
    color?: string
  }[]
}
