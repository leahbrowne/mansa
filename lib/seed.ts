import { supabase } from './supabase'

export async function seedDemo() {
  // Create demo consumer user
  const { data: demoUser, error: userError } = await supabase
    .from('users')
    .upsert({
      clerk_id: 'demo_consumer_001',
      name: 'Amara Diallo',
      email: 'amara@demo.mansa.app',
      mansa_balance: 2840,
      referral_code: 'AMARA2024',
      cuisine_preferences: ['West African', 'Caribbean', 'Ethiopian'],
    }, { onConflict: 'clerk_id' })
    .select()
    .single()

  if (userError) {
    console.error('Error creating demo user:', userError)
    throw userError
  }

  // Create demo restaurant
  const { data: demoRestaurant, error: restaurantError } = await supabase
    .from('restaurants')
    .upsert({
      name: 'Alara Lagos Kitchen',
      cuisine_type: 'West African',
      heritage_statement: 'A third-generation Lagos family bringing the tastes of Victoria Island to East London.',
      address: '42 Mare Street, Hackney, London E8 4RP',
      lat: 51.5465,
      lng: -0.0553,
      verification_status: 'certified',
      ownership_badge: 'Nigerian Owned',
      qr_code: 'ALARA-LAGOS-001',
      monthly_plan: 'grow',
      is_demo: true,
    }, { onConflict: 'qr_code' })
    .select()
    .single()

  if (restaurantError) {
    console.error('Error creating demo restaurant:', restaurantError)
    throw restaurantError
  }

  // Create 3 referred users to show referral history
  const referredUsers = [
    { name: 'Kofi Mensah', clerk_id: 'demo_referred_001' },
    { name: 'Fatou Sow', clerk_id: 'demo_referred_002' },
    { name: 'Yemi Adeyemi', clerk_id: 'demo_referred_003' },
  ]

  for (const referred of referredUsers) {
    await supabase
      .from('users')
      .upsert({
        clerk_id: referred.clerk_id,
        name: referred.name,
        email: `${referred.name.toLowerCase().replace(' ', '.')}@demo.mansa.app`,
        mansa_balance: Math.floor(Math.random() * 500) + 100,
        referred_by: demoUser.id,
        cuisine_preferences: ['West African'],
      }, { onConflict: 'clerk_id' })
  }

  // Create 12 sample transactions for the demo restaurant
  const transactionTypes = ['earn', 'earn', 'earn', 'redeem', 'earn', 'earn', 'earn', 'earn', 'redeem', 'earn', 'earn', 'earn']
  const spendAmounts = [28.50, 42.00, 35.75, null, 56.00, 22.50, 48.00, 31.25, null, 45.50, 38.00, 29.75]
  const mansasValues = [285, 420, 358, -500, 560, 225, 480, 313, -750, 455, 380, 298]

  for (let i = 0; i < 12; i++) {
    const daysAgo = Math.floor(Math.random() * 60) + 1
    const transactionDate = new Date()
    transactionDate.setDate(transactionDate.getDate() - daysAgo)

    await supabase
      .from('transactions')
      .insert({
        user_id: demoUser.id,
        restaurant_id: demoRestaurant.id,
        type: transactionTypes[i],
        mansas: mansasValues[i],
        spend_amount: spendAmounts[i],
        created_at: transactionDate.toISOString(),
      })
  }

  // Create referral bonus transactions
  for (let i = 0; i < 3; i++) {
    const daysAgo = Math.floor(Math.random() * 30) + 1
    const transactionDate = new Date()
    transactionDate.setDate(transactionDate.getDate() - daysAgo)

    await supabase
      .from('transactions')
      .insert({
        user_id: demoUser.id,
        restaurant_id: null,
        type: 'referral',
        mansas: 250,
        spend_amount: null,
        created_at: transactionDate.toISOString(),
      })
  }

  console.log('Demo data seeded successfully!')
  return { demoUser, demoRestaurant }
}
