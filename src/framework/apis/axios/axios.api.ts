import type { AxiosError, AxiosInstance, Method } from 'axios'
import axios from 'axios'
import { singleton } from 'tsyringe'

export interface ReqParams {
  url: string
  method: Method
  data?: any
  query?: any
  isMultipart?: boolean
}
@singleton()
export class AxiosApi {
  _axios: AxiosInstance
  constructor() {
    this._axios = axios.create({
      baseURL: 'http://128.199.203.244/api/'
    })

    // this.axios.interceptors.request.use(
    //   async (config) => {
    //     const token = localStorage.getItem('token')

    //     if (token) {
    //       const jwt: JwtPayload = jwt_decode(token)
    //       if (jwt) {
    //         console.log(new Date((jwt.exp as number) * 1000))
    //         console.log(new Date())

    //         if (Date.now() >= Number(jwt.exp) * 1000) {
    //           const refresh = await this.sendReq({
    //             url: 'auth/refresh',
    //             method: 'POST'
    //           })
    //           localStorage.setItem('token', refresh.data?.access_token as string)
    //           console.log(refresh.data)
    //         }
    //       }
    //     }
    //     return config
    //   },
    //   (error) => Promise.reject(error)
    // )
  }

  async sendReq({ url, method, data, query, isMultipart = false }: ReqParams) {
    return await this._axios({
      url,
      method,
      data,
      params: query,
      headers: {
        Authorization: this._getLocalToken(),
        'Content-Type': isMultipart ? 'multipart/form-data' : undefined
      }
    })
  }

  private _getLocalToken(): string | null {
    const token = localStorage.getItem('token')
    return `Bearer ${token}`
  }

  private _setLocalToken(token: string): void {
    localStorage.setItem('token', token)
  }

  private async _refreshToken(): Promise<string> {
    const res = await axios({
      url: 'http://128.199.203.244/api/auth/refresh',
      method: 'post',
      headers: { Authorization: this._getLocalToken() }
    })

    return res.data.access_token
  }
}
