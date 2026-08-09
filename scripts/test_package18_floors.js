async function testFloorMasterApi() {
  const baseUrl = 'http://127.0.0.1:3000/api/v1';

  console.log('==================================================');
  console.log('🧪 FLOOR MASTER INTEGRATION TESTS (NEW ARCH)');
  console.log('==================================================\n');

  let passed = 0;
  let failed = 0;

  const assert = (cond, title) => {
    if (cond) {
      console.log(`✓ [PASS] ${title}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${title}`);
      failed++;
    }
  };

  try {
    // 1. Seed
    console.log('--- 1. Seeding Database ---');
    const seedRes = await fetch(`${baseUrl}/seed`, { method: 'POST' }).then((r) => r.json());
    assert(seedRes.success === true, 'Database seeded successfully');

    // 2. Login
    console.log('\n--- 2. User Login ---');
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'rahul@abcdevelopers.com', password: 'Rahul@12345', tenantId: 'TENANT-ABC' })
    }).then((r) => r.json());

    const token = loginRes.data?.token;
    assert(!!token, 'Auth token acquired');

    const headers = {
      'Authorization': `Bearer ${token}`,
      'x-tenant-id': 'TENANT-ABC',
      'Content-Type': 'application/json'
    };

    // 2b. Create Parent Building and Tower for testing
    console.log('\n--- 2b. Setup Parent Building & Tower ---');
    const bldRes = await fetch(`${baseUrl}/master-data/projects/PRJ-001/buildings`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        code: 'BLD-A1',
        name: 'Building A1'
      })
    });
    const bldBody = await bldRes.json();
    console.log('Building Creation Response:', bldRes.status, JSON.stringify(bldBody, null, 2));
    assert(bldRes.status === 201, 'Parent Building created (201)');
    const buildingId = bldBody.data?.buildingId;

    const twrRes = await fetch(`${baseUrl}/master-data/projects/PRJ-001/towers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        buildingId,
        code: 'TWR-A1',
        name: 'Tower A1'
      })
    });
    const twrBody = await twrRes.json();
    assert(twrRes.status === 201, 'Parent Tower created (201)');
    const towerId = twrBody.data?.towerId;

    // 3. Create Floor under PROJECT parent
    console.log('\n--- 3. Floor Creation under PROJECT parent ---');
    const floorProjectRes = await fetch(`${baseUrl}/master-data/projects/PRJ-001/floors`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        parentType: 'PROJECT',
        code: 'GF-P',
        name: 'Ground Floor (Project Level)',
        floorNo: 0
      })
    });
    const floorProjectBody = await floorProjectRes.json();
    assert(floorProjectRes.status === 201, 'Floor created under PROJECT parent (201)');
    assert(floorProjectBody.data?.parentType === 'PROJECT', 'Floor parentType is PROJECT');
    assert(!floorProjectBody.data?.buildingId, 'buildingId is null for PROJECT parent');

    // 4. Create Floor under BUILDING parent
    console.log('\n--- 4. Floor Creation under BUILDING parent ---');
    const floorBuildingRes = await fetch(`${baseUrl}/master-data/projects/PRJ-001/floors`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        parentType: 'BUILDING',
        buildingId,
        code: 'F1-B',
        name: 'Floor 1 (Building Level)',
        floorNo: 1
      })
    });
    const floorBuildingBody = await floorBuildingRes.json();
    assert(floorBuildingRes.status === 201, 'Floor created under BUILDING parent (201)');
    assert(floorBuildingBody.data?.buildingId === buildingId, 'Floor buildingId matches parent building');

    // 5. Create Floor under TOWER parent (derives buildingId)
    console.log('\n--- 5. Floor Creation under TOWER parent ---');
    const floorTowerRes = await fetch(`${baseUrl}/master-data/projects/PRJ-001/floors`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        parentType: 'TOWER',
        towerId,
        code: 'F2-T',
        name: 'Floor 2 (Tower Level)',
        floorNo: 2
      })
    });
    const floorTowerBody = await floorTowerRes.json();
    assert(floorTowerRes.status === 201, 'Floor created under TOWER parent (201)');
    assert(floorTowerBody.data?.towerId === towerId, 'Floor towerId matches parent tower');
    assert(floorTowerBody.data?.buildingId === buildingId, 'buildingId is derived from tower');

    // 6. Validation: Duplicate code under same parent
    console.log('\n--- 6. Duplicate Code Validation ---');
    const dupRes = await fetch(`${baseUrl}/master-data/projects/PRJ-001/floors`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        parentType: 'PROJECT',
        code: 'GF-P',
        name: 'Duplicate Ground Floor',
        floorNo: 0
      })
    });
    assert(dupRes.status === 409, 'Duplicate floor code under same parent rejected with 409');

    // 7. Immutability: Prevent updating parentType
    console.log('\n--- 7. Immutability Validation ---');
    const updateRes = await fetch(`${baseUrl}/master-data/floors/${floorProjectBody.data.floorId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        parentType: 'BUILDING',
        name: 'Renamed Floor'
      })
    });
    const updateBody = await updateRes.json();
    assert(updateRes.status === 200, 'Update request succeeds (200)');
    assert(updateBody.data?.parentType === 'PROJECT', 'parentType remained immutable (PROJECT)');
    assert(updateBody.data?.name === 'Renamed Floor', 'Name was updated successfully');

    // 8. List Floors with parentType filter
    console.log('\n--- 8. Querying Floors ---');
    const listRes = await fetch(`${baseUrl}/master-data/projects/PRJ-001/floors?parentType=PROJECT`, { headers }).then((r) => r.json());
    assert(listRes.data?.length >= 1, 'Found floors filtered by parentType=PROJECT');

    console.log(`\n==================================================`);
    console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log(`==================================================\n`);

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  }
}

testFloorMasterApi();
