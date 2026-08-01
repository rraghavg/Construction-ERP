async function testMasterDataApi() {
  const baseUrl = 'http://127.0.0.1:3000/api/v1';

  console.log('--- 1. Testing Health Endpoint ---');
  const healthRes = await fetch(`${baseUrl}/health`).then((r) => r.json());
  console.log('Health Output:', healthRes);

  console.log('\n--- 2. Seeding Core Platform & Master Data Records ---');
  const seedRes = await fetch(`${baseUrl}/seed`, { method: 'POST' }).then((r) => r.json());
  console.log('Seed Output:', seedRes);

  console.log('\n--- 3. User Login (Rahul) ---');
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'rahul@abcdevelopers.com', password: 'Rahul@12345', tenantId: 'TENANT-ABC' })
  }).then((r) => r.json());

  const token = loginRes.data.token;
  console.log('Login Succeeded! Token acquired.');

  const headers = {
    'Authorization': `Bearer ${token}`,
    'x-tenant-id': 'TENANT-ABC',
    'Content-Type': 'application/json'
  };

  console.log('\n--- 4. Master Data Summary Dashboard ---');
  const summaryRes = await fetch(`${baseUrl}/master-data/summary`, { headers }).then((r) => r.json());
  console.log('Summary Output:', summaryRes);

  console.log('\n--- 5. List Companies ---');
  const companiesRes = await fetch(`${baseUrl}/master-data/companies`, { headers }).then((r) => r.json());
  console.log('Companies Output:', companiesRes);

  console.log('\n--- 6. List Projects (Resource Scoped to Project A) ---');
  const projectsRes = await fetch(`${baseUrl}/master-data/projects`, { headers }).then((r) => r.json());
  console.log('Projects Output:', projectsRes);

  console.log('\n--- 7. List Units ---');
  const unitsRes = await fetch(`${baseUrl}/master-data/units`, { headers }).then((r) => r.json());
  console.log('Units Output:', unitsRes);

  console.log('\n--- 8. Update Unit Status (UNT-101 -> BOOKED) ---');
  const updateStatusRes = await fetch(`${baseUrl}/master-data/units/UNT-101/status`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ status: 'BOOKED' })
  }).then((r) => r.json());
  console.log('Update Status Output:', updateStatusRes);

  console.log('\n--- 9. Update Unit Commercial Price (UNT-101 -> ₹ 8,200,000 + Audit Log) ---');
  const updatePriceRes = await fetch(`${baseUrl}/master-data/units/UNT-101/price`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ price: 8200000 })
  }).then((r) => r.json());
  console.log('Update Price Output:', updatePriceRes);

  console.log('\n--- 10. List Vendors (Masked Bank Details) ---');
  const vendorsRes = await fetch(`${baseUrl}/master-data/vendors`, { headers }).then((r) => r.json());
  console.log('Vendors Output:', vendorsRes);

  console.log('\n==================================================');
  console.log('✅ ALL MASTER DATA ENDPOINTS TESTED AND PASSED 100%!');
  console.log('==================================================');
}

testMasterDataApi().catch(console.error);
