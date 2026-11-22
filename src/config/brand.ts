// Everything that identifies the agency lives here. Swap these values (and the photos in
// public/images) to re-skin the template for a new client.
export const brand = {
  name: 'Yuval',
  descriptor: 'Travel with',
  // true: the descriptor reads before the name ("Travel with Yuval") and sits above it in
  // the wordmark; false: after it ("Oriel Travel") and below.
  descriptorFirst: true,
  // The advisor the copy speaks about, by first name.
  advisor: 'Yuval',
  // Add the surname here once confirmed.
  advisorFullName: 'Yuval',
  email: 'hello@example.com',
  instagram: '#',
  whatsapp: '#',
  // Shown in the footer; regulatory wording must be confirmed for each client.
  legal: 'Independent travel advisor.',
  protection: 'Financial protection details are provided with every booking.',
  // false: smooth scrolling, entrances and photo drift run for all visitors, even with the
  // OS "reduce motion" setting on. true: those visitors get a still page instead.
  respectReducedMotion: false,
}

export const brandName = brand.descriptorFirst
  ? `${brand.descriptor} ${brand.name}`
  : `${brand.name} ${brand.descriptor}`
