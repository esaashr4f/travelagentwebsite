// Everything that identifies the agency lives here. Swap these values (and the photos in
// public/images) to re-skin the template for a new client.
export const brand = {
  name: 'Oriel',
  descriptor: 'Travel',
  // The advisor the copy speaks about, by first name.
  advisor: 'Elena',
  advisorFullName: 'Elena Hart',
  email: 'hello@example.com',
  instagram: '#',
  whatsapp: '#',
  // Shown in the footer; regulatory wording must be confirmed for each client.
  legal: 'Independent travel advisor.',
  protection: 'Financial protection details are provided with every booking.',
  // false: smooth scrolling and every scroll scene run for all visitors, even with the
  // OS "reduce motion" setting on. true: those visitors get a calm, static page instead.
  respectReducedMotion: false,
  // How scenes hand over on laptops: 'slide' | 'dissolve' | 'canvas' | 'signature'
  // (see src/lib/transition.ts). Try them with ?transition=… in the address.
  transition: 'slide' as 'slide' | 'dissolve' | 'canvas' | 'signature',
}

export const brandName = `${brand.name} ${brand.descriptor}`
