import { BigBed, BigWig } from '../index'
import LocalFile from '../localFile'

describe('index formats', () => {
  it('loads small bigwig header', async () => {
    const ti = new BigWig({
      filehandle: new LocalFile(require.resolve('./data/volvox.bw')),
    })
    const indexData = await ti.getHeader()
    expect(indexData).toMatchSnapshot()
  })
  it('loads small bigbed header', async () => {
    const ti = new BigBed({
      filehandle: new LocalFile(require.resolve('./data/hg18.bb')),
    })
    const indexData = await ti.getHeader()
    expect(indexData).toMatchSnapshot()
  })
})
